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

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanys: builder.query({
      query: (params) => ({
        url: "company/getAllCompanys",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ['Company']
      // providesTags: (result, error, arg) =>  {
      //   console.log(result)
      //   return [       
      //   'Company',  ...result.companys.map(({id}) => ({ type: "Company", id })),
      //   ]}
      }),

    createCompany: builder.mutation({
      query: companyData => ({
          url: 'company/createCompany',
          method: 'POST',
          body: {
              ...companyData,
          }
      }),
      invalidatesTags: ['Company']
      // invalidatesTags: [
      //     { type: 'Company', id: "LIST" }
      // ]
    }),
    getAllCompanysNameWithCode: builder.query({
      query: () => ({
        url: "company/getAllCompanysNameWithCode",
        method: "GET",
      }),
      providesTags: ['Company']
      }),
    getAllShopsByCompany: builder.query({
      query: (params) => ({
        url: "company/getAllShopsByCompany",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ['Company']
      }),
   }),
});

export const {
  useGetAllCompanysQuery,
  useGetAllCompanysNameWithCodeQuery,
  useCreateCompanyMutation,
  useGetAllShopsByCompanyQuery
} = companyApiSlice;
