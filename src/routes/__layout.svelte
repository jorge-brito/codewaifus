<script lang="ts">
	import '$lib/global.css';
	import { getWaifus } from '@store/data';
	import Sidebar from '@components/Sidebar.svelte';
	import Appbar from '@components/Appbar.svelte';
</script>

<div class="relative pt-16">
	<Appbar />
	<main class="relative mx-auto row gap-2">
		{#await getWaifus()}
			<div class="absolute w-screen h-screen">
				<div class="col center mt-12 gap-8 w-full">
					<div class="w-96 h-96 rounded-full overflow-hidden shadow-md">
						<img src="loading.gif" alt="Loading" />
					</div>
					<div class="animate-pulse text-center">Loading stuff...</div>
				</div>
			</div>
		{:then}
			<Sidebar />
			<div class="flex-[9]">
				<slot />
			</div>
		{/await}
	</main>
</div>
