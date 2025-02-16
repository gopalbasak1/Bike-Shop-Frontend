import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";
import { TOrder } from "@/types/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      providesTags: ["orders"],
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/orders",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    orderStatusUpdate: builder.mutation({
      query: (args) => ({
        url: `/orders/${args.id}/status`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["orders"],
    }),

    getMyOrders: builder.query({
      providesTags: ["orders"],
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/orders/my-orders",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/orderBike",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["orders"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    // deleteProduct: builder.mutation({
    //   query: (args) => ({
    //     url: `/products/${args.id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["products"],
    // }),
  }),
});

export const {
  useGetAllOrderQuery,
  useGetMyOrdersQuery,
  useOrderStatusUpdateMutation,
  useCreateOrderMutation,
  useVerifyOrderQuery,
} = productApi;
