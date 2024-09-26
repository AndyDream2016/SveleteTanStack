<script>
	import Button from '$lib/theme/components/global/Button.svelte';
	import Tooltip from '$lib/melt/Tooltip.svelte';
	import { createCombobox, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import MdiChevronUp from '~icons/mdi/chevron-up';
	import MdiChevronDown from '~icons/mdi/chevron-down';
	import PhSortAscending from '~icons/ph/sort-ascending';
	import MdiCheck from '~icons/mdi/check';
	import Combobox from '$lib/theme/components/global/Combobox.svelte';
	import { LL } from '$i18n/i18n-svelte';
	let { chainFilter = $bindable([]), onChange } = $props();

	let networks = [
		{
			id: 1,
			label: 'Ethereum',
			value: 'ethereum',
			icon: 'E'
		},
		{
			id: 2,
			label: 'Solana',
			value: 'solana',
			icon: 'S'
		},
		{
			id: 3,
			label: 'Base',
			value: 'base',
			disabled: true
		},
		{
			id: 4,
			label: 'Tron',
			value: 'tron',
			disabled: true
		}
	];

	let selectedNetwork = $state(networks[0]);

	function handleNetworkSelect(network) {
		selectedNetwork = network;
		chainFilter = network.map((net) => net.value);
		onChange();
	}
</script>

<Combobox
	onChange={handleNetworkSelect}
	options={networks}
	showIconSelected={true}
	placeholder={$LL.selectnetwork()}
	showLabel={false}
	multiple={true}
	selectedClass={`h-8 w-[160px]`}
/>
