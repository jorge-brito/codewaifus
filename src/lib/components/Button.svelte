<script lang="ts">
	import Icon from '@iconify/svelte';

	export let icon: string = null;
	export let href: string = null;
	export let title = '';
	export { className as class };

	let className = '';

	$: defaultPadding = icon ? 'p-1' : 'px-3 py-2';
	$: buttonStyle = !className.match(/btn-/) ? 'btn-dark' : '';
	$: padding = !className.match(/p[a-z]*-/) ? defaultPadding : '';
	$: classes = `flex center text-light rounded-full outline-none ${padding} ${buttonStyle}`;
</script>

{#if href}
	<a
		{href}
		{title}
		type="button"
		role="button"
		class="{classes} {className}"
		on:click
		{...$$restProps}
	>
		{#if icon}
			<Icon {icon} />
		{:else}
			<slot />
		{/if}
	</a>
{:else}
	<button type="button" {title} class="{classes} {className}" on:click {...$$restProps}>
		{#if icon && icon != 'none'}
			<Icon {icon} />
		{:else}
			<slot />
		{/if}
	</button>
{/if}
