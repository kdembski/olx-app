import { useConsoleStore } from "@/store/console.store";
import axios from "axios";

export function useApi() {
  const baseUrl = "http://159.89.105.225:5001/";
  //const baseUrl = "http://localhost:5001/";
  const wsBaseUrl = baseUrl.replace("http", "ws");

  const url = (path: string) => baseUrl + path;
  const wsUrl = (path: string) => wsBaseUrl + path;

  const get = <T>(
    path: string,
    callback?: {
      onSuccess?: (data: T) => void;
      onError?: (e: any) => void;
      onFinally?: () => void;
    }
  ) => {
    return new Promise<T>(async (resolve) => {
      return axios
        .get<T>(url(path))
        .then((response) => {
          callback?.onSuccess?.(response.data);
          resolve(response.data);
        })
        .catch((e) => {
          callback?.onError?.(e);
          handleError(e);
        })
        .finally(() => {
          callback?.onFinally?.();
        });
    });
  };

  const post = <T>(
    path: string,
    data: unknown,
    callback?: {
      onSuccess?: (data: T) => void;
      onError?: (e: any) => void;
      onFinally?: () => void;
    }
  ) => {
    return new Promise<T>(async (resolve) => {
      return axios
        .post<T>(url(path), data)
        .then((response) => {
          callback?.onSuccess?.(response.data);
          resolve(response.data);
        })
        .catch((e) => {
          callback?.onError?.(e);
          handleError(e);
        })
        .finally(() => {
          callback?.onFinally?.();
        });
    });
  };

  const handleError = (e: any) => {
    const consoleStore = useConsoleStore();
    consoleStore.create({ type: "error", message: e.response.data });
  };

  return { get, post, wsUrl };
}
