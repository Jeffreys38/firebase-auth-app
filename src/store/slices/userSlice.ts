import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '@/src/models/User';
import DatabaseHelper from "@/src/helpers/DatabaseHelper";

// Define the fetchUsers async thunk
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const dbHelper = new DatabaseHelper<User>('users'); // Adjust the collection name as needed
    const users = await dbHelper.getAll(); // Fetch users from Firestore
    return users || []; // Return an empty array if no users found
});

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
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
        updateUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            });
    },
});

export const { addUser, deleteUser, updateUser, updateUsers  } = userSlice.actions;

export default userSlice.reducer;
