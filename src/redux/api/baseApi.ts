import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://bike-store-ebon.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 404 and 403 errors
  if (result.error && "data" in result.error) {
    const errorData = result.error.data as { message?: string };
    if (result.error.status === 404) {
      toast.error(errorData.message || "Resource not found");
    }
    if (result.error.status === 403) {
      toast.error(errorData.message || "Forbidden access");
    }
  }

  // Handle 401 - Unauthorized
  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    const res = await fetch(
      "https://bike-store-ebon.vercel.app/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();
    console.log(data);

    if (data.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["products", "users", "orders", "reviews"],
});
