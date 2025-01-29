<script lang="ts">
	import { userStore } from '$lib/stores/user.store';
	import Value from '$lib/components/Value.svelte';
	import { formatE8sICP } from '$lib/utils/icp.utils';
	import Button from '$lib/components/Button.svelte';
	import { loadBalance } from '$lib/services/ledger.services';
	import { balanceStore } from '$lib/stores/balance.store';

	const reloadBalance = async () => await loadBalance({ owner: $userStore?.owner });

	$effect(() => {
		(async () => {
			await reloadBalance();
		})();
	});
</script>

<article class="py-4">
	<Value id="icp-balance-section" title="Balance">
		<output data-tid="icp-balance">{formatE8sICP($balanceStore)} ICP</output>
	</Value>

	<Button onclick={reloadBalance}>Reload</Button>
</article>
