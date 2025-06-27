"use client";
import { getCookie } from "@/utility";
import { QueryClient } from "@tanstack/react-query";
import { endPoints, endPointsTypes } from "./endpoints";

const baseURL = "https://mawrid.backend.devxonic.com";

// Custom fetch function that supports different HTTP methods
const Fetch = async (url: string, options: any = {}, isMultipart = false) => {
  const token = getCookie("U_at");
  const headers = {
    "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers, // Merge with any additional headers passed in options
  };

  console.log("Fetch URL => ", baseURL + url, options);
  const requestURL = baseURL + url;
  const requestPayload = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };
  console.log("Fetch URL => request ", requestPayload, requestURL);
  try {
    const response = await fetch(requestURL, requestPayload);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 400) {
        console.log("bad Request");
        throw new Error(
          errorData?.message || errorData?.error || "Bad Request"
        );
      }
      if (response.status === 401) {
        console.log("Unauthorized Access");
        throw new Error(
          errorData?.message || errorData?.error || "Unauthorized access"
        );
      }
      throw new Error(
        errorData?.message ||
        errorData?.error ||
        `HTTP error! status: ${response.status}`
      );
    }
    console.log("response => ", baseURL + url, response);
    return response.json();
  } catch (error) {
    console?.error("API Error:", error);
    throw error;
  }
};

// HTTP methods using customFetch
export const api = {
  get: async (url: endPointsTypes, options: any = {}) => {
    const queryParams = options.params
      ? "?" + new URLSearchParams(options.params).toString()
      : "";
    console.log("api.get => ", endPoints[url] + queryParams, options);
    return await Fetch(endPoints[url] + queryParams, {
      method: "GET",
      ...options,
    });
  },
  post: async (url: endPointsTypes, body?: any, options: any = {}) => {
    const queryParams = options.params
      ? "?" + new URLSearchParams(options.params).toString()
      : "";
    return await Fetch(endPoints[url] + queryParams, {
      method: "POST",
      body,
      ...options,
    });
  },
  put: async (url: endPointsTypes, body: any, options: any = {}) => {
    const queryParams = options.params
      ? "?" + new URLSearchParams(options.params).toString()
      : "";
    return await Fetch(endPoints[url] + queryParams, {
      method: "PUT",
      body,
      ...options,
    });
  },
  patch: async (url: endPointsTypes, body: any, options: any = {}) => {
    const queryParams = options.params
      ? "?" + new URLSearchParams(options.params).toString()
      : "";
    return await Fetch(endPoints[url] + queryParams, {
      method: "PATCH",
      body,
      ...options,
    });
  },
  delete: async (url: endPointsTypes, options: any = {}) => {
    const queryParams = options.params
      ? "?" + new URLSearchParams(options.params).toString()
      : "";
    return await Fetch(endPoints[url] + queryParams, {
      method: "DELETE",
      ...options,
    });
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Use custom fetch for all queries
      queryFn: async ({ queryKey }) => {
        const [url, options] = queryKey as [string, { headers?: HeadersInit }];
        console.log("queryKey => ", queryKey);
        return await Fetch(url, { ...options });
      },
    },
  },
});

export default api;

export const uploadFileAPIHandler = async (formData: any) => {
  try {
    const requestURL = "https://upload.devxonic.com/api/upload";
    const requestPayload = {
      method: "POST",
      body: formData,
    };
    console.log("requestPayload uplaod Image=> ", requestPayload);
    const response = await fetch(requestURL, requestPayload);
    console.log("response uplaod Image=> ", response);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 400) {
        console.log("bad Request");
        throw new Error(
          errorData?.message || errorData?.error || "Bad Request"
        );
      }
      if (response.status === 401) {
        console.log("Unauthorized Access");
        throw new Error(
          errorData?.message || errorData?.error || "Unauthorized access"
        );
      }
      throw new Error(
        errorData?.message ||
        errorData?.error ||
        `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
    // filename: "1629781536-IMG_20210823_123456.jpg"
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
