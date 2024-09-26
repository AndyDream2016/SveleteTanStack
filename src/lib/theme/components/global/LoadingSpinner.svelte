<script>
	let { className } = $props();
</script>

<span class={`loader border-3 h-8 w-8 ${className}`}></span>

<style>
	.loader {
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
