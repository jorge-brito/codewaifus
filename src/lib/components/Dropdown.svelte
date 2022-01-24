<script lang="ts">
	export let offsetX = 0;
	export let offsetY = 10;

	let opened = false;
	let target: HTMLDivElement;
	let options: HTMLDivElement;

	const open = () => (opened = true);
	const close = () => (opened = false);

	const updatePosition = () => {
		if (options && target) {
			const rect = target.getBoundingClientRect();
			const { width } = options.getBoundingClientRect();

			const x = rect.right - width + offsetX;
			const y = rect.bottom + offsetY;

			options.style.top = y + 'px';
			options.style.left = Math.max(Math.abs(x), 20) + 'px';
		}
	};

	$: if (target && options) updatePosition();
</script>

<svelte:window on:resize={updatePosition} />

<div bind:this={target}>
	<slot {open} {close} />
</div>

{#if opened}
	<div class="absolute inset-0 w-screen h-screen" on:click={close} />
	<div class="absolute" bind:this={options}>
		<slot name="options" {open} {close} />
	</div>
{/if}
