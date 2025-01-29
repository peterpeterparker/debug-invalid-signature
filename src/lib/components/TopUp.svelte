<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { topUp as topUpServices } from '$lib/services/top-up.services';
	import { loadBalance } from '$lib/services/ledger.services';
	import { userStore } from '$lib/stores/user.store';
	import { isNullish } from '@dfinity/utils';
	import { unsafeIdentity } from '@junobuild/core';
	import { balanceStore } from '$lib/stores/balance.store';
	import { ICP_FEE, TOP_UP_VALUE } from '$lib/constants/app.constants';

	let disabled = $derived($balanceStore <= 0n);

	let status = $state<'idle' | 'in_progress' | 'request_stop'>('idle');

	const topUp = async () => {
		if (isNullish($userStore?.owner)) {
			console.error('Not signed-in!');
			return;
		}

		const identity = await unsafeIdentity();

		if (identity.getPrincipal().isAnonymous()) {
			console.error('What? Anonymous?');
			return;
		}

		await topUpServices({ identity });
	};

	const repeatTopUp = async () => {
		console.log('About to top-up 🛵');

		await topUp();

		console.log('Top-up done ✅');

		await loadBalance({ owner: $userStore?.owner });

		console.log('Balance reloaded 🆗');

		if ($balanceStore >= ICP_FEE + TOP_UP_VALUE && status === 'in_progress') {
			console.log('Repeating top-up 🔁');
			await repeatTopUp();
		}
	};

	const topUps = async () => {
		try {
			await repeatTopUp();

			console.log('All top-ups done 🥳');
		} catch (error: unknown) {
			console.error('ERROR ⚠️');
			console.log(error);
		}

		status = 'idle';
	};

	const toggle = async () => {
		if (status === 'in_progress') {
			status = 'request_stop';
			return;
		}

		status = 'in_progress';
		topUps();
	};
</script>

<article class="pb-4">
	<Button {disabled} onclick={toggle}>{status === 'idle' ? 'Start top-up' : 'Stop'}</Button>
</article>
