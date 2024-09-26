<script>
	import IconButton from './IconButton.svelte';
	import PhEyeDuotone from '~icons/ph/eye-duotone';
	import PhEyeSlashDuotone from '~icons/ph/eye-slash-duotone';
	import PhXBold from '~icons/ph/x-bold';
	import { twclsx } from '$lib/utils/twclsx.js';
	let {
		type = 'text',
		label,
		placeholder,
		value = $bindable(),
		clearButton,
		name,
		className,
		parent
	} = $props();

	let showPassword = $state(false);
	let error = '';

	function clearInput() {
		value = '';
	}

	function toggleShowPassword() {
		showPassword = !showPassword;
	}
</script>

<div class={twclsx(`relative flex flex-col items-start`, parent)}>
	{#if label}
		<label for={name} class="inline-flex label pb-3 cursor-pointer text-xs md:text-sm"
			>{label}</label
		>
	{/if}
	<input
		id={name}
		{name}
		class={twclsx(
			`input bg-input hover:bg-inputHover border-border hover:border-borderHover rounded-button h-12 px-4 w-full focus:outline-0`,
			className
		)}
		autocomplete="off"
		bind:value
		type={showPassword ? 'text' : type}
		{placeholder}
	/>

	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>
