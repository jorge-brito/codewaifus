<script lang="ts">
	import Button from './Button.svelte';
	export let category: string;
</script>

<div class="rounded-lg w-full h-full animate-pulse">
	<div class="relative p-2 w-full h-full shadow-lg col center gap-2">
		<Button
			class="btn-* absolute top-3 left-3 px-2 py-1 text-xs text-opacity-0 bg-[#ddd] dark:bg-dark"
		>
			{category}
		</Button>
		<div class="flex-1 bg-[#eee] dark:bg-[#242a2e] w-full" />
		<div class="row center w-full gap-2">
			<div class="flex-1 w-full h-8 bg-[#eee] dark:bg-[#242a2e]" />
			<div class="w-8 h-8 rounded-full bg-[#eee] dark:bg-[#242a2e]" />
		</div>
	</div>
</div>
