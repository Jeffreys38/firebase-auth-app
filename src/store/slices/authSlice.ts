import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getAuth, GoogleAuthProvider,
    signInWithEmailAndPassword, signInWithPopup,
    signOut
} from 'firebase/auth';
import firebase from "firebase/compat";
import {FirebaseError} from "@firebase/util";
import {router} from "expo-router";

import { AppThunk } from '../index';

interface AuthState {
    user: firebase.User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<firebase.User>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
    const auth = getAuth();
    try {
        dispatch(loginStart());
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        dispatch(loginSuccess(userCredential.user));
    } catch (error: any) {
        dispatch(loginFailure(error.message));
        throw new FirebaseError(error?.code, error?.message)
    }
};


export const logout = (): AppThunk => async (dispatch) => {
    const auth = getAuth();
    try {
        await signOut(auth);
        dispatch(logoutSuccess());
        router.replace('/login');
    } catch (error: any) {
        dispatch(loginFailure(error.message));

        if (error instanceof FirebaseError) {
            throw new FirebaseError(error?.code, error?.message)
        }
    }
};

export const loginWithGoogle = (): AppThunk => async (dispatch) => {

};
export const loginWithGithub = (): AppThunk => async (dispatch) => {

};
