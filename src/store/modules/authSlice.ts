import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../services/api.service";

export const loginAction = createAsyncThunk(
    "auth/login",
    async (login: any, options) => {
        const result = await loginUser(login);

        return result;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            const result = action.payload;

            if (result.ok) {
                return result.data;
            }

            return null;
        });
    },
});

export default authSlice.reducer;
