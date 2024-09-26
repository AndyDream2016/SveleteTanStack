<script>
	import SpringCard from '$lib/components/global/motion/SpringCard.svelte';
	import FloatingInput from '$lib/components/global/input/FloatingInput.svelte';
	import Checkbox from '$lib/components/global/input/Checkbox.svelte';
	import Button from '$lib/theme/components/global/Button.svelte';
	import SwitchTitle from '$lib/components/global/input/SwitchTitle.svelte';
	import PageTitle from '$lib/components/global/content/PageTitle.svelte';
	import Divider from '$lib/components/global/content/Divider.svelte';
	import PageDescription from '$lib/components/global/content/PageDescription.svelte';

	import BasilSettingsAdjustSolid from '~icons/basil/settings-adjust-solid';
	import MenuItem from '$lib/components/frontend/menu/content/MenuItem.svelte';

	import Metamask from '$assets/icons/Metamask.svelte';
	import Coinbase from '$assets/icons/Coinbase.svelte';
	import { onMount } from 'svelte';
</script>

<div class="grid grid-cols-2 min-h-[300px]">
	<div class="py-4 px-6 border-r border-border">
		<h2 class="text-2xl text-highlight">Connect</h2>
		<div class="flex justify-between items-center pt-4 pb-6">
			<div class="flex items-center space-x-2">
				<Button className="h-8 rounded-full bg-primary text-black" label="Test" type="tint"
					><span class="text-xs md:text-sm">Email</span></Button
				>
				<Button className="h-8 rounded-full bg-modalTint" label="Test" type="tint"
					><span class="text-xs md:text-sm">Ethereum</span></Button
				>
				<Button className="h-8 rounded-full bg-modalTint" label="Test" type="tint"
					><span class="text-xs md:text-sm">Solana</span></Button
				>
			</div>
		</div>
		<div class="space-y-2">
			<MenuItem
				icon={Metamask}
				label="Metamask"
				href="/"
				position="single"
				buttonBg="bg-modalTint"
			/>
			<MenuItem
				icon={Coinbase}
				label="Coinbase"
				href="/"
				position="single"
				buttonBg="bg-modalTint"
			/>
		</div>
	</div>
	<div class="py-4 px-6 space-y-4">
		<h2 class="text-2xl text-highlight">How To</h2>
		<p>Lorem ipsum</p>
	</div>
</div>
