<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';
	import Button from './Button.svelte';
	import Search from './Search.svelte';
	import Icon from '@iconify/svelte';
	import { scale } from 'svelte/transition';
	import { menuOpen } from './Sidebar.svelte';
	import { category, categories } from '@store/data';
	import Dropdown from './Dropdown.svelte';
	import Source from './Source.svelte';

	$: currentCategory = $categories.find(
		(item) => item.title.toLowerCase() == $category?.toLowerCase()
	)?.title;
</script>

<div class="w-full fixed top-0 bg-light dark:bg-dark z-50 border-b border-primary/20">
	<div class="row h-16 items-center px-4 gap-3 mx-auto">
		<a href="/" class="text-primary font-bold text-lg">
			code<em class="text-secondary">waifus</em>
		</a>
		{#if currentCategory}
			<div transition:scale>
				<Button class="btn-primary px-3 py-1 text-sm">{currentCategory}</Button>
			</div>
		{/if}
		<div class="flex-1 md:hidden" />
		<Search class="hidden md:flex" />
		<Source />
		<ThemeSwitch />
		<Button
			icon="ci:menu-alt-05"
			class="text-2xl lg:hidden btn-alt-dark dark:btn-alt-light"
			on:click={() => menuOpen.update((value) => !value)}
		/>
	</div>
</div>
