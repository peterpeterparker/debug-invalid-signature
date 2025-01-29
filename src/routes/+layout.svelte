<script lang="ts">
	import type { Snippet } from 'svelte';
	import { initSatellite } from '@junobuild/core';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
	import Auth from '$lib/components/Auth.svelte';
	import { userStore } from '$lib/stores/user.store';
	import { nonNullish } from '@dfinity/utils';
	import { fade } from 'svelte/transition';
	import { CONTAINER, SATELLITE_ID } from '$lib/constants/app.constants';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const init = async () => {
		await initSatellite({
			satelliteId: SATELLITE_ID,
			container: CONTAINER,
			workers: {
				auth: true
			}
		});
	};

	$effect(() => {
		init();
	});
</script>

<div class="relative isolate min-h-[100dvh]">
	<main
		class="mx-auto max-w-(--breakpoint-2xl) py-16 px-8 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]"
	>
		<h1 class="dark:text-white text-5xl md:text-6xl font-bold tracking-tight md:pt-24 pb-4">
			Debug Invalid Signature
		</h1>

		{#if nonNullish($userStore)}
			<ul class="dark:text-white pb-4 md:max-w-lg" in:fade>
				<li>1. Transfer ICP to {$userStore?.key ?? ''}</li>
				<li>2. Open the browser debugger</li>
				<li>3. Try top-ups (to Juno Console, 0.0001 ICP + fee each)</li>
			</ul>
		{/if}

		<Auth>
			{@render children()}
		</Auth>
	</main>

	<Footer />
</div>
