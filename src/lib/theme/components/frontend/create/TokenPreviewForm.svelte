<script>
	import MdiTrayUpload from '~icons/mdi/tray-upload';
	import PageSubTitle from '$lib/theme/components/frontend/page/PageSubTitle.svelte';
	import PageDescription from '$lib/theme/components/frontend/page/PageDescription.svelte';
	import Button from '$lib/theme/components/global/Button.svelte';
	import IconButton from '$lib/theme/components/global/IconButton.svelte';
	import MdiPlus from '~icons/mdi/plus';
	import RiTwitterXFill from '~icons/ri/twitter-x-fill';
	import RiTelegramFill from '~icons/ri/telegram-fill';
	import MdiYoutube from '~icons/mdi/youtube';
	import PhGlobe from '~icons/ph/globe';
	import MdiEmailOutline from '~icons/mdi/email-outline';
	import IcBaselineDiscord from '~icons/ic/baseline-discord';
	import IcBaselineTiktok from '~icons/ic/baseline-tiktok';
	import MdiInstagram from '~icons/mdi/instagram';
	import IcBaselineFacebook from '~icons/ic/baseline-facebook';
	import IcBaselineReddit from '~icons/ic/baseline-reddit';
	import MingcuteMediumFill from '~icons/mingcute/medium-fill';
	import TablerDots from '~icons/tabler/dots';
	import MdiRemove from '~icons/mdi/remove';
	import { LL } from '$i18n/i18n-svelte';
	let { children, tokenName = $bindable(), banner, logo } = $props();

	let isDraggingBanner = $state(false);
	let isDraggingLogo = $state(false);

	let bannerPreviewUrl = $state(null);
	let logoPreviewUrl = $state(null);

	$effect(() => {
		if ($banner && $banner[0] instanceof File) {
			bannerPreviewUrl = URL.createObjectURL($banner[0]);
			return () => URL.revokeObjectURL(bannerPreviewUrl);
		} else {
			bannerPreviewUrl = null;
		}
	});

	$effect(() => {
		if ($logo && $logo[0] instanceof File) {
			logoPreviewUrl = URL.createObjectURL($logo[0]);
			return () => URL.revokeObjectURL(logoPreviewUrl);
		} else {
			logoPreviewUrl = null;
		}
	});

	function handleDragEnter(type) {
		if (type === 'banner') isDraggingBanner = true;
		else if (type === 'logo') isDraggingLogo = true;
	}

	function handleDragLeave(type) {
		if (type === 'banner') isDraggingBanner = false;
		else if (type === 'logo') isDraggingLogo = false;
	}

	function handleDrop(type, event) {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file) {
			if (type === 'banner') $banner = file;
			else if (type === 'logo') $logo = file;
		}
		handleDragLeave(type);
	}

	function handleRemove(type) {
		if (type === 'banner') $banner = null;
		else if (type === 'logo') $logo = null;
	}

	function handleFileInputChange(type, event) {
		const file = event.target.files?.[0];
		if (file) {
			if (type === 'banner') $banner = file;
			else if (type === 'logo') $logo = file;
		}
	}
</script>

<div class="h-full flex flex-col space-y-4 md:space-y-6 lg:w-md">
	<div class="space-y-1">
		<PageSubTitle title={$LL.tokenpreview()} />
		<PageDescription>{$LL.uploadabannerandalogo()}</PageDescription>
	</div>
	<div class="border border-border p-4 rounded-button">
		<ul class="list-disc list-inside text-xxs space-y-2">
			<li>{$LL.bannersize()}: 600px {$LL.width()}, 200px {$LL.height()}</li>
			<li>{$LL.logosize()}: 100px {$LL.width()}, 100px {$LL.height()}</li>
			<li>{$LL.acceptedfiletypes()}: JPG, PNG, GIF</li>
		</ul>
	</div>
	<!-- Banner Upload -->
	<div class="relative">
		<div
			class={`relative w-full aspect-[3/1] border-dashed border-2 ${
				isDraggingBanner ? 'bg-tint' : 'border-border'
			} flex flex-col items-center justify-center rounded-button cursor-pointer hover:border-highlight`}
			onclick={() => document.getElementById('bannerInput').click()}
			ondrop={(e) => handleDrop('banner', e)}
			ondragover={(e) => e.preventDefault()}
			ondragenter={() => handleDragEnter('banner')}
			ondragleave={() => handleDragLeave('banner')}
		>
			{#if bannerPreviewUrl}
				<div class="relative aspect-[3/1] overflow-hidden w-full h-full">
					<img
						src={bannerPreviewUrl}
						alt="Banner Preview"
						class="absolute top-0 left-0 w-full h-full object-cover"
					/>
				</div>
			{:else}
				<div
					class="absolute m-auto left-0 right-0 text-center flex flex-col items-center space-y-2 pointer-events-none"
				>
					<MdiTrayUpload class="w-6 h-6" />
					<div class="text-xs">
						{$LL.dragorclick()} <span class="text-primary">{$LL.addbanner()}</span>
					</div>
				</div>
			{/if}
		</div>
		{#if bannerPreviewUrl}
			<button
				type="button"
				onclick={() => handleRemove('banner')}
				class="absolute right-2 top-2 bg-primary w-6 h-6 flex items-center justify-center rounded-full border-4 border-background z-5"
			>
				<MdiRemove class="text-black h-3 w-3" />
			</button>
		{/if}
		<input
			id="bannerInput"
			type="file"
			accept="image/jpeg, image/png, image/gif"
			class="hidden"
			bind:files={$banner}
		/>
		<div class="absolute bottom-0 left-4 -mb-10 border-4 border-background rounded-full">
			<div
				class={`relative w-full min-w-[90px] md:min-w-[100px] max-w-[100px] aspect-square border-dashed border-2 bg-background ${
					isDraggingLogo ? 'bg-tint' : 'border-border'
				} flex flex-col items-center justify-center rounded-full cursor-pointer hover:border-highlight`}
				onclick={() => document.getElementById('logoInput').click()}
				ondrop={(e) => handleDrop('logo', e)}
				ondragover={(e) => e.preventDefault()}
				ondragenter={() => handleDragEnter('logo')}
				ondragleave={() => handleDragLeave('logo')}
			>
				{#if logoPreviewUrl}
					<div class="relative overflow-hidden w-full h-full">
						<img
							src={logoPreviewUrl}
							alt="Logo Preview"
							class="absolute top-0 left-0 w-full h-full object-cover rounded-full"
						/>
					</div>
				{:else}
					<div
						class="absolute m-auto left-0 right-0 text-center flex flex-col items-center space-y-2 pointer-events-none"
					>
						<MdiTrayUpload class="w-6 h-6" />
						<span class="text-xs text-primary">{$LL.addlogo()}</span>
					</div>
				{/if}
			</div>
			{#if logoPreviewUrl}
				<button
					type="button"
					onclick={() => handleRemove('logo')}
					class="absolute left-20 bottom-0 bg-primary w-6 h-6 flex items-center justify-center rounded-full border-4 border-background"
				>
					<MdiRemove class="text-black h-3 w-3" />
				</button>
			{/if}
			<input
				id="logoInput"
				type="file"
				accept="image/jpeg, image/png, image/gif"
				class="hidden"
				onchange={(e) => handleFileInputChange('logo', e)}
				bind:files={$logo}
			/>
		</div>
	</div>

	<div class="pt-9 space-y-4 px-2">
		<div class="space-y-1 px-2">
			<h1 class="text-highlight">{tokenName || 'Shiba INU'}</h1>
			<span class="text-sm uppercase">{'SHIBA'} / WETH</span>
		</div>
		<div class="flex items-center space-x-1">
			<div class="flex items-center space-x-2 w-full hidden">
				<Button type="tint" paddingY="py-2" className="w-full">
					<div class="flex items-center">
						<MdiPlus class="h-6 w-6" />
						<span>{$LL.addwebsiteandsocials()}</span>
					</div>
				</Button>
			</div>

			<IconButton>
				<PhGlobe class="h-6 w-6" />
			</IconButton>
			<IconButton>
				<RiTwitterXFill class="h-6 w-6" />
			</IconButton>
			<IconButton>
				<RiTelegramFill class="h-6 w-6" />
			</IconButton>

			<IconButton>
				<TablerDots class="h-6 w-6" />
			</IconButton>

			<div class="hidden">
				<div>
					<IconButton>
						<PhGlobe class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<RiTwitterXFill class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<RiTelegramFill class="h-6 w-6" />
					</IconButton>
				</div>

				<div>
					<IconButton>
						<MdiEmailOutline class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<MdiYoutube class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<IcBaselineDiscord class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<IcBaselineTiktok class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<MdiInstagram class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<IcBaselineFacebook class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<IcBaselineReddit class="h-6 w-6" />
					</IconButton>
				</div>
				<div>
					<IconButton>
						<MingcuteMediumFill class="h-6 w-6" />
					</IconButton>
				</div>
			</div>
		</div>
	</div>

	{@render children()}
</div>
