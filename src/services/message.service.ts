import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/api-response";
import { ProfileApiResponse } from "../models/ProfileApiResponse";
import { ProfilecallExternalApi } from "./Profile-external-api.service";
import { callExternalApi } from "./external-api.service";


import { InputData } from "../pages/inputDataTypes";


const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getPublicResource = async (): Promise<ProfileApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await ProfilecallExternalApi({ config })) as ProfileApiResponse;

  return {
    data,
    error,
  };
};

export const getProtectedResource = async (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const postProtectedResource = async (
  accessToken: string,
  //postData: { username: string; password: string } // Specify the appropriate type for your request data
  postData: InputData
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "POST", // Use POST method
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify(postData), // Include the request data here
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};


export const getAdminResource = async (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};
