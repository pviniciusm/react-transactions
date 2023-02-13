import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./modules/auth/authSlice";

export const rootReducer = combineReducers({
    auth: authSlice,
});
