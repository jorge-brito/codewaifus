<script lang="ts">
	import Images from '@components/Images.svelte';
	import { waifus } from '@store/data';
</script>

<Images images={$waifus} />
