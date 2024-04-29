import { useWebSocket } from "@/composables/websocket";

export type UseWebSocket<T> = ReturnType<typeof useWebSocket<T>>;
