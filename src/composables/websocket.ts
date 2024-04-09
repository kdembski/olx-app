import { useApi } from "@/composables/api";
import { ref } from "vue";

export function useWebSocket<MessageT>(path: string) {
  const ws = ref<WebSocket>();
  const onmessage = ref<((e: MessageEvent<string>) => void) | null>(null);

  const isOpen = () => ws.value?.readyState === WebSocket.OPEN;

  const isClosed = () =>
    ws.value?.readyState === WebSocket.CLOSED ||
    ws.value?.readyState === WebSocket.CLOSING;

  const isConnecting = () => ws.value?.readyState === WebSocket.CONNECTING;

  const initWebSocket = () => {
    if (isOpen()) {
      return;
    }

    const { wsUrl } = useApi();
    const url = wsUrl(path);
    ws.value = new WebSocket(url);
    ws.value.onmessage = onmessage.value;
  };

  const send = async (message: MessageT) => {
    if (!ws.value || isClosed()) {
      setTimeout(() => {
        initWebSocket();
        send(message);
      }, 5);

      return;
    }

    if (isConnecting()) {
      setTimeout(() => {
        send(message);
      }, 5);

      return;
    }

    ws.value?.send(JSON.stringify(message));
  };

  return { send, onmessage };
}
