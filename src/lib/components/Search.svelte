<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export { className as class };

	let className = '';
	let search = $page.params.search ?? '';

	const handleSubmit = () => {
		if (search) goto('/search/' + encodeURIComponent(search));
		else goto('/');
	};
</script>

<form
	class="{className} flex-1 items-center justify-between rounded-full border border-dark/20 dark:border-light/20 overflow-hidden dark:focus-within:border-primary focus-within:border-primary focus-within:border-2"
	on:submit|preventDefault={handleSubmit}
>
	<input
		bind:value={search}
		type="search"
		placeholder="Search waifu"
		class="pl-4 pr-2 min-w-[20ch] border-none outline-none focus:ring-0 bg-light text-dark dark:text-light dark:bg-dark flex-1"
	/>
	<button
		type="submit"
		class="p-2 mr-2 flex center text-dark dark:text-light cursor-pointer outline-none border-none rounded-full"
	>
		<Icon icon="mdi:magnify" class="text-xl" />
	</button>
</form>

<style lang="postcss">
	input::-webkit-search-cancel-button {
		@apply ml-4;
	}
</style>
