import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '@/src/models/User';

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
