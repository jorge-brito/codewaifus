<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount, tick } from 'svelte';

	import type { Waifu } from '@store/data';
	import Masonry from 'svelte-masonry-layout';
	import Image from './Image.svelte';

	export let images: Waifu[];
	export let columnWidth = 0;

	let i = 1;
	const N = 50;
	$: showing = images.slice(0, N);

	let updateGrid: () => void;
	let observer: IntersectionObserver;

	const loadMoreImages = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			if (showing.length < images.length) {
				showing = [...showing, ...images.slice(N + N * (i - 1), ++i * N)];
			}
		}
	};

	onMount(async () => {
		observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target as HTMLImageElement;
					img.src = img.dataset.src;
					img.removeAttribute('data-set');
					observer.unobserve(img);
				}
			});
		});
		await tick();
		updateGrid();
	});

	beforeNavigate(() => (images = []));
	afterNavigate(() => updateGrid && updateGrid());
</script>

<svelte:window on:scroll={loadMoreImages} />

<Masonry
	items={showing}
	class="min-h-full"
	gap="5px"
	breakpointCols={{
		default: 5,
		400: 1,
		512: 2,
		800: 3,
		1360: 4
	}}
	bind:columnWidth
	bind:updateGrid
>
	{#each showing as img}
		<Image {...img} {columnWidth} {observer} />
	{/each}
</Masonry>
