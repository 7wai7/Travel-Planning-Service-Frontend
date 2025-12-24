import type { AxiosResponse } from "axios";
import axios from "axios";

export async function fetcher<T>(
  promise: Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await promise;
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.error(err.response);
        // помилка з сервера
        throw err.response.data;
      } else {
        console.error(err.message);
        // мережна помилка або таймаут
        throw new Error(err.message);
      }
    }
    throw err; // невідома помилка
  }
}
