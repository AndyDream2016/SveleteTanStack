<script>
	import { getContext } from 'svelte';
	import ModalDialog from '$lib/components/frontend/modals/ModalDialog.svelte';
	import ModalContent from '$lib/components/frontend/modals/ModalDialogContent.svelte';
	import Button from '$lib/theme/components/global/Button.svelte';
	import { WALLET_CONTEXT_KEY } from '$lib/providers/walletStore.svelte';
	import { LL } from '$i18n/i18n-svelte';

	import PageSubTitle from '$lib/theme/components/frontend/page/PageSubTitle.svelte';

	let { buttonType } = $props();

	const walletStore = getContext(WALLET_CONTEXT_KEY);
	let modalConnect = $state(false);
	async function signCustomMessage() {
		try {
			const message = 'Hello, this is a test message!';
			const signature = await walletStore.signMessage(message);
			alert(`Message signed successfully. Signature: ${signature}`);
		} catch (error) {
			alert(`Error signing message: ${error.message}`);
		}
	}
</script>

<ModalDialog width="w-[95%] md:w-[500px]" bind:modalConnect>
	{#snippet button({ onclick })}
		{#if walletStore.isConnected}
			<button onclick={walletStore.disconnectWallet}>DC</button>
		{/if}

		<Button
			{onclick}
			type={buttonType}
			className="h-7 md:h-11 whitespace-nowrap  text-xs !font-semibold"
			aria="Connect Wallet"
		>
			<span>{$LL.connectwallet()}</span>
		</Button>
	{/snippet}
	{#snippet content()}
		<ModalContent>
			<div class="px-6 py-4">
				<div class="text-xl text-highlight font-bold pb-6">Connect Wallet</div>
				{#if walletStore.isConnected}
					<p>Connected Address: {walletStore.address}</p>
					<p>Chain ID: {walletStore.chain}</p>
					<p>Wallet Type: {walletStore.walletType}</p>
					<button onclick={walletStore.disconnectWallet}>Disconnect</button>
				{:else if walletStore.isConnecting}
					<p>Connecting...</p>
				{:else}
					<div class="flex flex-col space-y-2">
						<button
							class="border border-border rounded-button px-4 py-3 text-left"
							onclick={() => walletStore.connectWallet('metamask')}>Connect MetaMask</button
						>
						<button
							class="border border-border rounded-button px-4 py-3 text-left"
							onclick={() => walletStore.connectWallet('coinbase')}>Connect Coinbase Wallet</button
						>
						<button
							class="border border-border rounded-button px-4 py-3 text-left"
							onclick={() => walletStore.connectWallet('walletconnect')}
							>Connect WalletConnect</button
						>
					</div>
				{/if}
			</div>
		</ModalContent>
	{/snippet}
</ModalDialog>
