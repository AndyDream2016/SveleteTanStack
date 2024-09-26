<script>
	import TablerCapsuleFilled from '~icons/tabler/capsule-filled';
	let { value, format } = $props();

	let amount = $state(parseFloat(value));
</script>

<div class:text-red-400={amount < 0} class:text-green-400={amount > 0} class="flex gap-1">
	{format(value)}
	<span class:opacity-40={Math.abs(amount) < 400}>
		<TablerCapsuleFilled />
	</span>
</div>
