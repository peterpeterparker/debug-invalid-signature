<script lang="ts">
	import Balance from '$lib/components/Balance.svelte';
	import TopUp from '$lib/components/TopUp.svelte';
	import Worker from '$lib/components/Worker.svelte';
</script>

<Worker>
	<Balance />

	<TopUp />
</Worker>
