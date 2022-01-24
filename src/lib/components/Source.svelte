<script>
	import Icon from '@iconify/svelte';
	import Button from './Button.svelte';
	import Dropdown from './Dropdown.svelte';

	const linkAttrs = {
		class:
			'row items-center gap-3 px-3 py-2 hover:bg-dark/10 dark:hover:bg-light/10 transition-colors',
		target: '_blank',
		rel: 'noreferrer'
	};
</script>

<Dropdown let:open offsetY={20}>
	<Button
		icon="mdi:github"
		class="text-3xl btn-alt-dark dark:btn-alt-light"
		title="Source (Github)"
		on:click={open}
	/>
	<div
		slot="options"
		class="py-2 bg-theme rounded-lg shadow-lg drop-shadow-lg border-l-4 border-l-primary"
	>
		<a {...linkAttrs} href="https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books">
			<Icon icon="mdi:github" />
			<span class="flex-1 overflow-ellipsis whitespace-nowrap w-[22ch] md:w-full overflow-hidden"
				>Anime Girls Holding Programming Books</span
			>
			<Icon icon="akar-icons:link-out" />
		</a>
		<a {...linkAttrs} href="https://github.com/jorge-brito/codewaifus">
			<Icon icon="mdi:github" />
			<span class="flex-1">Source Code</span>
			<Icon icon="akar-icons:link-out" />
		</a>
	</div>
</Dropdown>
