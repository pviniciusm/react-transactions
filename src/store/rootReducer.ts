import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./modules/authSlice";
import transactionsReducer from "./modules/transactionsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "transaction",
    storage,
};

const combinedReducers = combineReducers({
    auth: authReducer,
    transactions: transactionsReducer,
});

export const persistedReducer = persistReducer(persistConfig, combinedReducers);
