<script context="module" lang="ts">
	import { categories, search, category } from '@store/data';
	import { writable } from 'svelte/store';

	export const menuOpen = writable(false);
</script>

<script lang="ts">
	import Button from './Button.svelte';
	import Search from './Search.svelte';

	const closeMenu = () => menuOpen.set(false);

	$: navlinks = $categories.map((item) => {
		if (item.title == 'All')
			return {
				...item,
				active: !$search && !$category
			};
		else
			return {
				...item,
				active: $category?.toLowerCase() == item.title.toLowerCase()
			};
	});
</script>

<div
	class="fixed lg:hidden w-screen h-screen top-0 left-0 bg-dark/75 z-[50]"
	class:hidden={!$menuOpen}
	on:click={closeMenu}
/>
<aside
	class="fixed top-0 left-0 w-[300px] z-[51] flex-[1] min-w-[280px] lg:z-10 lg:block h-screen lg:sticky inset-0 lg:-mt-16 bg-light dark:bg-dark lg:translate-x-0 {$menuOpen
		? 'translate-x-[0]'
		: 'translate-x-[calc(6px-100%)]'} transition-transform duration-300 ease-in-out"
>
	<div class="fixed right-0 w-[8px] h-full pointer-events-none z-[-1] bg-primary" />
	<nav class="lg:mt-16 h-full lg:h-[calc(100%-4rem)] overflow-y-auto scrollbar-primary">
		<div
			class="sticky top-0 left-0 row items-center justify-between px-4 h-16 lg:hidden border-b border-b-primary/20 bg-light dark:bg-dark"
		>
			<a href="/" class="text-primary font-bold text-lg">
				code<em class="text-secondary">waifus</em>
			</a>
			<Button
				title="Close menu"
				icon="ci:close-big"
				class="btn-dark p-2 text-xl"
				on:click={closeMenu}
			/>
		</div>
		<div class="px-4 mt-6 mb-4">
			<Search class="row md:hidden" />
		</div>
		<ul class="py-2 w-full">
			{#each navlinks as { count, link, title, active }}
				<li class="mb-2">
					<a
						href={link}
						on:mouseup={closeMenu}
						class="row justify-between items-center px-4 py-2 rounded-l-full ml-2 {active
							? 'bg-primary text-light'
							: 'hover:bg-primary/10'}"
					>
						<span>{title}</span>
						<span class="bg-dark/5 py-1 px-3 text-sm rounded-full">{count}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
