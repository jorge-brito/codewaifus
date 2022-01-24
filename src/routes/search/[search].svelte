<script lang="ts">
	import { page } from '$app/stores';
	import { waifus } from '@store/data';
	import Images from '@components/Images.svelte';
	import { escapeRegex } from '$lib/utils';

	$: search = $page.params.search;
	$: searchImgs = !search
		? $waifus
		: $waifus.filter((img) => {
				const regex = new RegExp(escapeRegex(search), 'gi');
				return regex.test(img.name) || regex.test(img.category);
		  });
</script>

{#if searchImgs.length > 0}
	<Images images={searchImgs} />
{:else}
	<div class="text-center text-2xl mt-16">No results found :/</div>
{/if}
