<script>
	import TableDefaultLayout from '$lib/table/TableDefaultLayout.svelte';

	let { tableData } = $props();
</script>

<TableDefaultLayout {tableData} />
