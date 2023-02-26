import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/user/getAllUsers",
        method: "GET",
        params: { ...params },
      }),
    }),
    CreateUser: builder.mutation({
      query: (userData) => ({
        url: "user/createUser",
        method: "POST",
        body: {
          ...userData,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useCreateUserMutation } = userApiSlice;
