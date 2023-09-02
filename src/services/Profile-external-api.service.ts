import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ProfileApiResponse } from "../models/ProfileApiResponse";
//import { ProfilecallExternalApi } from "./Profile-external-api.service";

import { AppError } from "../models/app-error";

export const ProfilecallExternalApi = async (options: {
  config: AxiosRequestConfig;
}): Promise<ProfileApiResponse> => {
  try {
    const response: AxiosResponse = await axios(options.config);
    const { data } = response;

    return {
      data,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const { response } = axiosError;

      let message = "http request failed";

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && (response.data as AppError).message) {
        message = (response.data as AppError).message;
      }

      return {
        data: null,
        error: {
          message,
        },
      };
    }

    return {
      data: null,
      error: {
        message: (error as Error).message,
      },
    };
  }
};
