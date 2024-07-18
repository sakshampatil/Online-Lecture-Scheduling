import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Login } from "../../types/types";
import { BASE_URL } from "../../constants/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, Login>({
      query: (body: Login) => {
        return {
          url: "/auth/login",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
