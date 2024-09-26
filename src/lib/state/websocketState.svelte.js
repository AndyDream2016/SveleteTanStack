import { getContext, onDestroy, onMount, setContext } from 'svelte';
import { PUBLIC_WEBSOCKET_URL } from '$env/static/public';

const SOCKET_CONNECTING = 0;
const SOCKET_OPEN = 1;
const SOCKET_CLOSING = 2;
const SOCKET_CLOSED = 3;

export class WebSocketState {
	socket = $state(null);
	isAuthenticated = $state(false);
	wallet = getContext('wallet');
	status = $state(true);
	subscribers = new Map();

	constructor() {
		$effect(() => {
			if (this.wallet && this.wallet.isConnected && !this.isAuthenticated) {
				this.authenticateWebSocket(this.wallet.authData);
			}
		});

		onMount(() => {
			this.connectWebSocket();
		});

		onDestroy(() => {
			if (this.socket) this.socket.close();
		});
	}

	connectWebSocket() {
		this.socket = new WebSocket(PUBLIC_WEBSOCKET_URL); // Replace with your WebSocket URL
		this.socket.onopen = () => {
			this.status = true;
			console.log('WebSocket connection opened', this.socket);
			this.socket.send(JSON.stringify({ type: 'identify', role: 'guest' }));
		};

		this.socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			this.handleMessage(data);
		};

		this.socket.onclose = (event) => {
			this.status = false;
			console.log('WebSocket connection closed', event);
			this.reconnectWebSocket();
		};

		this.socket.onerror = (error) => {
			console.error('WebSocket error', error);
		};
	}

	authenticateWebSocket(authData) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify({ type: 'authenticate', data: authData }));
			this.isAuthenticated = true;
		}
	}

	reconnectWebSocket() {
		setTimeout(() => {
			this.connectWebSocket();
		}, 3000);
	}

	// New method to handle incoming messages
	handleMessage(data) {
		const { type } = data;
		if (this.subscribers.has(type)) {
			this.subscribers.get(type).forEach((callback) => callback(data));
		}
	}

	// New method to subscribe to a specific message type
	subscribe(type, callback) {
		if (!this.subscribers.has(type)) {
			this.subscribers.set(type, new Set());
		}
		this.subscribers.get(type).add(callback);

		// Return an unsubscribe function
		return () => {
			this.subscribers.get(type).delete(callback);
			if (this.subscribers.get(type).size === 0) {
				this.subscribers.delete(type);
			}
		};
	}

	// New method to send a message
	send(message) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(message));
		} else {
			console.error('WebSocket is not open. Unable to send message.');
		}
	}
}

const WEBSOCKET_KEY = Symbol('WEBSOCKET');

export function setWebSocketState() {
	return setContext(WEBSOCKET_KEY, new WebSocketState());
}

export function getWebSocketState() {
	return getContext(WEBSOCKET_KEY);
}
