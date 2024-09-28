import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interface/interface';


export interface UserState {
    id: number | null;
    username?: string;
    firstName?: string;
    lastName?: string;
}

const initialState: UserState = {
    id: null,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            const { id, username, firstName, lastName } = action.payload;
            state.id = id;
            state.username = username;
            state.firstName = firstName;
            state.lastName = lastName;
        },
        clearUser: (state) => {
            state.id = null;
            state.username = undefined;
            state.firstName = undefined;
            state.lastName = undefined;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
