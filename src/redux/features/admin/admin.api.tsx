import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TUser } from "@/types";
import { TProduct } from "@/types/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      providesTags: ["users"],
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/users",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    statusUpdate: builder.mutation({
      query: (args) => ({
        url: `/users/change-status/${args.id}`,
        method: "POST",
        body: args.data,
      }),
      invalidatesTags: ["users"],
    }),

    getAllProduct: builder.query({
      providesTags: ["products"],
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/products",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          //meta: response.meta,
        };
      },
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (args) => ({
        url: `/products/${args._id}`,
        method: "PUT",
        body: args.data,
      }),
    }),
    getSingleProductQuery: builder.query({
      query: (args) => ({
        url: `/products/${args._id}`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (args) => ({
        url: `/products/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQueryQuery,
  useDeleteProductMutation,
  useGetAllUsersQuery,
  useStatusUpdateMutation,
} = productApi;
