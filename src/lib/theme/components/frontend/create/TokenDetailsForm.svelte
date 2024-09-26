<script>
	import PageSubTitle from '$lib/theme/components/frontend/page/PageSubTitle.svelte';
	import PageFormTitle from '$lib/theme/components/frontend/page/PageFormTitle.svelte';
	import PageDescription from '$lib/theme/components/frontend/page/PageDescription.svelte';
	import Input from '$lib/theme/components/global/Input.svelte';
	import Button from '$lib/theme/components/global/Button.svelte';
	import PhGlobe from '~icons/ph/globe';
	import RiTwitterXFill from '~icons/ri/twitter-x-fill';
	import RiTelegramFill from '~icons/ri/telegram-fill';

	import Tooltip from '$lib/melt/Tooltip.svelte';
	import { createCombobox, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import MdiChevronUp from '~icons/mdi/chevron-up';
	import MdiChevronDown from '~icons/mdi/chevron-down';
	import PhSortAscending from '~icons/ph/sort-ascending';
	import MdiCheck from '~icons/mdi/check';
	import { writable } from 'svelte/store';
	import Combobox from '$lib/theme/components/global/Combobox.svelte';
	import { LL } from '$i18n/i18n-svelte';
	let {
		tokenName = $bindable(),
		tokenSymbol = $bindable(),
		errors = undefined,
		onTokenNameChange,
		onTokenSymbolChange
	} = $props();

	let website = $state(false);
	let settings = $state(false);

	let networks = [
		{
			id: 1,
			label: 'Ethereum',
			value: 'ethereum'
		},
		{
			id: 2,
			label: 'Solana',
			value: 'solana',
			disabled: true
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
</script>

<div class="lg:border lg:border-border lg:p-6 rounded-button space-y-pageMobile md:space-y-page">
	<div class="space-y-1">
		<PageFormTitle title={$LL.tokendetails()} />
	</div>

	<Combobox
		options={networks}
		placeholder={$LL.selectnetwork()}
		selectedClass={`h-12`}
		labelText={$LL.network()}
	/>

	<div class="grid grid-cols-5 gap-4">
		<div class="col-span-3">
			<Input
				type="text"
				label={$LL.name()}
				name="name"
				placeholder="SHIBA INU"
				clearButton={false}
				bind:value={tokenName}
				oninput={onTokenNameChange}
			/>

			{#if errors.name?.length}
				{errors?.name[0]}
			{/if}
		</div>
		<div class="col-span-2">
			<Input
				type="text"
				label={$LL.symbol()}
				name="symbol"
				placeholder="SHIBA"
				clearButton={false}
				bind:value={tokenSymbol}
				on:input={onTokenSymbolChange}
			/>
		</div>
	</div>
</div>

<div class="border border-border px-6 py-4 rounded-button space-y-pageMobile md:space-y-page">
	<div class="flex items-center justify-between" onclick={() => (website = !website)}>
		<div>
			<PageFormTitle padding={false} title={$LL.websiteandsocials()} />
		</div>
		<div class="cursor-pointer text-3xl text-highlight">+</div>
	</div>

	{#if website}
		<div class="space-y-4">
			<div class="flex flex-col">
				<label for="website" class="label pb-3 cursor-pointer text-xs md:text-sm"
					>{$LL.website()}</label
				>
				<div
					class="relative flex border border-border rounded-button focus-within:outline-1 focus-within:outline-primary"
				>
					<div class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
						<PhGlobe class="h-6 w-6" />
					</div>
					<input
						id="website"
						type="text"
						class="flex-1 border-0 pl-12 text-highlight focus:outline-0 py-4"
						placeholder="https://shibatoken.com/"
					/>
				</div>
			</div>
			<div class="flex flex-col">
				<label for="website" class="label pb-3 cursor-pointer text-xs md:text-sm">X (Twitter)</label
				>
				<div
					class="relative flex border border-border rounded-button focus-within:outline-1 focus-within:outline-primary"
				>
					<div class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
						<RiTwitterXFill class="h-6 w-6" />
					</div>
					<input
						id="website"
						type="text"
						class="flex-1 border-0 pl-12 text-highlight focus:outline-0 py-4"
						placeholder="https://x.com/Shibtoken"
					/>
				</div>
			</div>
			<div class="flex flex-col">
				<label for="website" class="label pb-3 cursor-pointer text-xs md:text-sm">Telegram</label>
				<div
					class="relative flex border border-border rounded-button focus-within:outline-1 focus-within:outline-primary"
				>
					<div class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
						<RiTelegramFill class="h-6 w-6" />
					</div>
					<input
						id="website"
						type="text"
						class="flex-1 border-0 pl-12 text-highlight focus:outline-0 py-4"
						placeholder="https://t.me/shiba"
					/>
				</div>
			</div>
			<div class="text-primary">+ {$LL.addanotherlink()}</div>
		</div>
	{/if}
</div>

<div class="border border-border px-6 py-4 rounded-button space-y-pageMobile md:space-y-page">
	<div class="flex items-center justify-between" onclick={() => (settings = !settings)}>
		<PageFormTitle padding={false} title={$LL.tokensettings()} />
		<div class="cursor-pointer text-3xl text-highlight">+</div>
	</div>

	{#if settings}
		{$LL.soon()}
	{/if}
</div>
