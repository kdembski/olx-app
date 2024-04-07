import axios from "axios";

export function useApi() {
  //const baseUrl = "http://159.89.105.225:5001/";
  const baseUrl = "http://localhost:5001/";

  const url = (path: string) => {
    return baseUrl + path;
  };

  const get = <T>(path: string) => axios.get<T>(url(path));

  return { get };
}
