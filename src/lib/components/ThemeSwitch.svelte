<script lang="ts">
	import Icon from '@iconify/svelte';

	import { darkMode } from '@store/theme';
	import { onMount } from 'svelte';

	$: style = $darkMode
		? 'bg-light focus-within:ring-light/25'
		: 'bg-dark focus-within:ring-dark/25';

	onMount(() => {
		const darkModeEnabled = localStorage.getItem('theme') == 'dark';
		darkMode.set(darkModeEnabled);
	});
</script>

<div
	class="relative w-12 h-7 rounded-full row items-center px-1 focus-within:ring-4 {style} text-light text-lg"
>
	<div
		class="w-5 h-5 bg-white rounded-full transition-all flex center"
		class:translate-x-5={$darkMode}
	>
		{#if $darkMode}
			<Icon icon="ic:round-dark-mode" class="text-dark" />
		{:else}
			<Icon icon="ic:round-light-mode" class="text-light" />
		{/if}
	</div>
	<input
		title="Toggle dark mode"
		type="checkbox"
		role="switch"
		class="centered w-full h-full opacity-0 cursor-pointer"
		bind:checked={$darkMode}
	/>
</div>
