<script lang="ts">
	import Images from '@components/Images.svelte';
	import { waifus, category } from '@store/data';

	$: images = $waifus
		.filter((item) => {
			return item.category.toLowerCase() == $category?.toLowerCase();
		})
		.sort((a, b) => b.height - a.height);
</script>

{#if images.length > 0 && $waifus.length > 0}
	<Images {images} />
{:else}
	<div class="col center gap-4 w-full h-full">
		<h1 class="font-bold text-2xl">
			Sorry, but no waifu was found holding a <em>{$category}</em> book :/
		</h1>
		<p>Use the sidebar to navigate between the avaible categories.</p>
	</div>
{/if}
