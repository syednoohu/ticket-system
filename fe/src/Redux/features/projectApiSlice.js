// baseUrl: 'http://localhost:3500/api/v1',

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

// const OrdersAdapter = createEntityAdapter({
//   selectId: (company) => company.id,
//   // sortComparer: (a, b) => b.dateOfOrder.localeCompare(a.dateOfOrder),
// });

// const initialState = OrdersAdapter.getInitialState({
//   total:0, success: false, products: []
// });

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: (params) => ({
        url: "project/getAllProjects",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ['Project']
      // providesTags: (result, error, arg) =>  {
      //   console.log(result)
      //   return [       
      //   'Company',  ...result.companys.map(({id}) => ({ type: "Company", id })),
      //   ]}
      }),

    createProject: builder.mutation({
      query: projectData => ({
          url: 'project/createProject',
          method: 'POST',
          body: {
              ...projectData,
          }
      }),
      invalidatesTags: ['Project']
      // invalidatesTags: [
      //     { type: 'Company', id: "LIST" }
      // ]
    }),

   }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation
} = projectApiSlice;
