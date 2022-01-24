<script lang="ts">
	// Libs
	import { download, hovered } from '@utils';
	import { scale } from 'svelte/transition';
	import { writable } from 'svelte/store';
	// Components
	import Loading from './Loading.svelte';
	import Button from './Button.svelte';
	import Icon from '@iconify/svelte';
	// Props
	export let url: string;
	export let name: string;
	export let width: number;
	export let height: number;
	export let category: string;
	export let columnWidth: number;
	export let observer: IntersectionObserver;
	// State
	let loading = true;
	let downloading = false;
	let img: HTMLImageElement;
	const isHovered = writable(false);
	// Events
	const downloadImg = async () => {
		downloading = true;
		await download(url, name);
		downloading = false;
	};

	$: if (img && observer) {
		observer.observe(img);
	}
</script>

<div
	style="height: {(columnWidth * height) / width}px;"
	class="relative overflow-hidden flex center cursor-pointer rounded-sm bg-light dark:bg-dark"
	data-name={name}
	use:hovered={isHovered}
>
	{#if loading} <Loading {category} /> {/if}

	{#if $isHovered && !loading}
		<div transition:scale class="grid place-items-center absolute bottom-3 right-3 z-20">
			<Button on:click={downloadImg} title="Download image" class="btn-secondary p-1 shadow-md">
				<Icon
					width="1.5rem"
					height="1.5rem"
					class={downloading && 'animate-spin'}
					icon={downloading ? 'ei:spinner-3' : 'mdi:heart'}
				/>
			</Button>
		</div>
	{/if}

	<img
		alt={name}
		data-src={url}
		width={columnWidth}
		class="object-cover w-full h-full transition-transform origin-center ease-out duration-300 {loading &&
			'centered pointer-events-none opacity-0'} {$isHovered && 'scale-150'}"
		on:load={() => (loading = false)}
		bind:this={img}
	/>
</div>
