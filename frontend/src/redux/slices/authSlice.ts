import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface AuthState {
    loading: boolean;
    token: string;
    user: any;
}

const initialState: AuthState = {
    loading: true,
    token: "",
    user: null,
}

const {actions, reducer} = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, {payload}) {
            state.loading = false;
            state.token = payload.token;

            if (payload.token) {
                try {
                    state.user = JSON.parse(atob(payload.token.split('.')[1]));
                } catch (error) {
                    state.user = null;
                }
            } else {
                state.user = null;
            }
        },
    },
});

export const {setAuth} = actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectLoading = (state: RootState) => state.auth.loading;

export default reducer;