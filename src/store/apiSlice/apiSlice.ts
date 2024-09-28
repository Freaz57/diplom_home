import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct, IUser, IUserLogin, IUserLoginResponse } from "../interface/interface";

export interface ProductsResponse {
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
}


const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        searchProducts: builder.query<ProductsResponse, { q: string; limit: number; skip: number }>({
            query: ({ q = '', limit = 12, skip = 0 }) => `products/search?q=${q}&limit=${limit}&skip=${skip}`,
        }),
        getProductById: builder.query<IProduct, number>({
            query: (id: number) => {
                return `products/${id}`;
            }
        }),
        userAuth: builder.mutation<IUserLoginResponse, IUserLogin>({
            query: (loginData) => ({
                url: 'auth/login',
                method: 'POST',
                body: loginData,
            }),
        }),
        getCurrentUser: builder.query<IUser, void>({
            query: () => ({
                url: 'auth/me',
            }),
        }),
    }),
});

export const {
    useSearchProductsQuery,
    useGetProductByIdQuery,
    useUserAuthMutation,
    useGetCurrentUserQuery,
} = apiSlice;
