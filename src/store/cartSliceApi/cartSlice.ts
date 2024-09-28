import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cart, Product } from '../interface/interface';
import { RootState } from "../store.ts";

export interface CartState {
    cart: Cart | null;
    totalQuantity: number;
    loading: boolean;
    error: string | null;
    isCartLoaded: boolean;
}

const initialState: CartState = {
    cart: null,
    totalQuantity: 0,
    loading: false,
    error: null,
    isCartLoaded: false,
}


const getAuthToken = () => localStorage.getItem('token');


export const fetchUserCart = createAsyncThunk<Cart, number>(
    'cart/fetchUserCart',
    async (userId: number) => {

        const token = getAuthToken();

        try {
            const response = await fetch(`https://dummyjson.com/carts/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch carts');
            }

            const data = await response.json();
            if (data.carts && data.carts.length > 0) {
                return data.carts[0];
            } else {
                throw new Error('No carts found');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }

    }
);



export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async (payload: { userId: number; products: Product[] }) => {
        const token = getAuthToken();

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        try {
            const response = await fetch(`https://dummyjson.com/carts/${payload.userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    merge: false,
                    products: payload.products
                })
            });

            if (!response.ok) {
                const errorDetail = await response.text();
                throw new Error(`Failed to update cart: ${response.statusText} - ${errorDetail}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.totalQuantity = action.payload.totalQuantity;
                state.isCartLoaded = true;
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch carts';
                state.isCartLoaded = true;
            })
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.totalQuantity = action.payload.totalQuantity;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update cart';
            });
    },
});

export const selectCartProducts = (state: RootState) => {
    const cart = state.cart.cart;
    if (!cart) return {};

    return cart.products.reduce((acc, product) => {
        acc[product.id] = product.quantity;
        return acc;
    }, {} as { [key: number]: number });
};

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectTotalQuantity = (state: RootState) => state.cart.totalQuantity;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectIsCartLoaded = (state: RootState) => state.cart.isCartLoaded;

