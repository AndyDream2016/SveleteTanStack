<script>
	import IcRoundStar from '~icons/ic/round-star';
	let { checked, onChange } = $props();

	const toggleCheckbox = () => {
		checked = !checked;
		onChange(checked); // Emit the new state
	};
</script>

<button class="icon-checkbox" onclick={toggleCheckbox}>
	{#if checked}
		<IcRoundStar class="h-6 w-6 text-primary" />
	{:else}
		<IcRoundStar class="h-6 w-6 text-gray-400" />
	{/if}
</button>

<style>
	.icon-checkbox {
		cursor: pointer;
		display: inline-block;
	}
</style>
