<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { isNullish } from '@dfinity/utils';
	import { userStore } from '$lib/stores/user.store';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let balanceWorker = $state<Worker | undefined>(undefined);

	const startTimer = async ({ owner }: { owner: string }) => {
		const BalanceWorker = await import('$lib/workers/balance.worker?worker');
		balanceWorker = new BalanceWorker.default();

		balanceWorker.postMessage({ msg: 'start', data: { owner } });
	};

	const stopTimer = () => balanceWorker?.postMessage({ msg: 'stop' });

	$effect(() => {
		if (isNullish($userStore?.owner)) {
			return;
		}

		startTimer({ owner: $userStore?.owner });
	});

	onDestroy(stopTimer);
</script>

{@render children()}
