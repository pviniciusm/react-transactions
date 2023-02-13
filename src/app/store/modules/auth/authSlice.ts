import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../../services/api.service";

export const loginAction: any = createAsyncThunk("authSlice/login", async (payload: any, options) => {
    const result = await login({
        cpf: payload.cpf,
        password: payload.password,
    });

    if (!result.ok) {
        options.rejectWithValue(result);
    }

    return result;
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        logged: false,
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            return {
                logged: true,
                user: action.payload.data,
            };
        });
    },
});

export default authSlice.reducer;
