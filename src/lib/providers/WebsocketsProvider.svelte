<script>
	import { setWebSocketState } from '$lib/state/websocketState.svelte.js';

	let { children } = $props();

	setWebSocketState();
</script>

{@render children()}
