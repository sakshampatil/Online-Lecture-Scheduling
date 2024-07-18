import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/constants";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).auth.token;
      const token = JSON.parse(localStorage.getItem("user") || "").token;

      //   console.log("TOKEN = ", JSON.parse(localStorage.getItem("user") || "").token);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getCoursesList: builder.query({
      query: (search) => ({
        url: `/course/list?search=${search}`,
      }),
    }),
    createCourse: builder.mutation({
      query: (body) => ({
        url: `course/create`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetCoursesListQuery, useCreateCourseMutation } = coursesApi;
