import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./cartSliceApi/cartSlice.ts";
import {apiSlice} from "./apiSlice/apiSlice.ts";
import userSlice from "./userSlice/userSlice.ts";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)

})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;