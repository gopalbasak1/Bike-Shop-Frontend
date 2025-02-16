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
          url: `/users?${params.toString()}`,
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
        if (args && Array.isArray(args)) {
          // Ensure args is an array
          args.forEach((item: TQueryParam) => {
            if (item && item.name && item.value) {
              params.append(item.name, item.value.toString());
            }
          });
        }
        params.append("limit", "100"); // Ensure fetching all products
        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
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
    getSingleProduct: builder.query({
      providesTags: ["products"],
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
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useGetAllUsersQuery,
  useStatusUpdateMutation,
} = productApi;
