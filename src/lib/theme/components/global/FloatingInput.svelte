<script>
	import IconButton from './IconButton.svelte';
	import PhEyeDuotone from '~icons/ph/eye-duotone';
	import PhEyeSlashDuotone from '~icons/ph/eye-slash-duotone';
	import PhXBold from '~icons/ph/x-bold';
	let { type = 'text', label, placeholder, value, clearButton } = $props();

	let showPassword = $state(false);
	let error = '';

	function clearInput() {
		value = '';
	}

	function toggleShowPassword() {
		showPassword = !showPassword;
	}
</script>

<div class="relative">
	<input
		class="input bg-input border-border hover:border-borderHover rounded-input pt-6 pb-2 px-4"
		autocomplete="off"
		bind:value
		type={showPassword ? 'text' : type}
		{placeholder}
	/>
	<label class="label">{label}</label>
	<div class="absolute flex right-3 top-1/2 transform -translate-y-1/2">
		<!-- {#if clearButton}
			<button class="clear" aria-label="Clear input" on:click={clearInput}>
				<PhXBold class="w-6 h-6" />
			</button>
		{/if} -->
		{#if type === 'password'}
			<IconButton {toggleShowPassword}>
				{#if showPassword}
					<PhEyeSlashDuotone class="w-6 h-6" />
				{:else}
					<PhEyeDuotone class="w-6 h-6" />
				{/if}
			</IconButton>
		{/if}
	</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style>
	.input {
		width: 100%;
		transition: border-color 250ms ease-in-out;

		&:focus {
			outline: none;
		}

		&::placeholder {
			color: transparent;
		}

		&::-webkit-contacts-auto-fill-button {
			visibility: hidden;
			pointer-events: none;
			position: absolute;
		}
	}

	.label {
		position: absolute;
		top: 16px;
		left: 16px;
		pointer-events: none;
		transform-origin: left center;
		transition: transform 200ms ease-in-out;
	}

	.input:focus + .label,
	.input:not(:placeholder-shown) + .label {
		transform: translateY(-50%) scale(0.7);
	}

	.clear {
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		position: absolute;
		top: 50%;
		right: -9px;
		transform: translateY(-50%);
		background: none;
		border: none;
		border-radius: 50%;
		height: 30px;
		width: 30px;
		color: #777;
		transition: color 250ms;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover,
		&:focus {
			color: #333;
		}
	}

	.input:placeholder-shown + .label + .clear {
		display: none;
	}
</style>
