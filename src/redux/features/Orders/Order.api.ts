import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TUser } from "@/types";
import { TOrder, TProduct } from "@/types/product";

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
      transformResponse: (response: TResponseRedux<TUser[]>) => {
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

    // addProduct: builder.mutation({
    //   query: (data) => ({
    //     url: "/products",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // updateProduct: builder.mutation({
    //   query: (args) => ({
    //     url: `/products/${args._id}`,
    //     method: "PUT",
    //     body: args.data,
    //   }),
    // }),
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
} = productApi;
