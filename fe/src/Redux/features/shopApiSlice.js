// baseUrl: 'http://localhost:3500/api/v1',

// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

// const OrdersAdapter = createEntityAdapter({
//   selectId: (company) => company.id,
//   // sortComparer: (a, b) => b.dateOfOrder.localeCompare(a.dateOfOrder),
// });

// const initialState = OrdersAdapter.getInitialState({
//   total:0, success: false, products: []
// });

export const shopApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: (params) => ({
        url: "shop/getAllShops",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ['Shop'],
      // providesTags: (result, error, arg) =>  {
      //   console.log(result)
      //   return [       
      //   'Shop',  ...result.shops.map(({id}) => ({ type: "Shops", id })),
      //   ]}
    }),

    createShop: builder.mutation({
      query: shopData => ({
          url: 'shop/createShop',
          method: 'POST',
          body: {
              ...shopData,
          }
      }),
      invalidatesTags: ['Shop']
    }),
    getAllShopsNameWithCode: builder.query({
      query: () => ({
        url: "shop/getAllShopsNameWithCode",
        method: "GET",
      }),
      providesTags: ['Shop']
      }),
      getShopsNameByCode: builder.query({
        query: () => ({
          url: "shop/getShopsNameByCode",
          method: "GET",
        }),
        providesTags: ['Shop']
        }),

  }),
});
 
export const {
  useGetAllShopsQuery,
  useCreateShopMutation,
  useGetAllShopsNameWithCodeQuery,
  useGetShopsNameByCodeQuery
} = shopApiSlice;
