import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    deleteTransaction,
    listTransactions,
} from "../../services/api.service";

export const listTransactionsAction = createAsyncThunk(
    "transactions/list",
    async (id: string) => {
        const result = await listTransactions(id);
        return result;
    }
);

export const deleteTransactionAction = createAsyncThunk(
    "transactions/delete",
    async (transaction: any) => {
        const result = await deleteTransaction(
            transaction.id,
            transaction.userId
        );
        return result;
    }
);

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            listTransactionsAction.fulfilled,
            (state, action: any) => {
                if (action.payload.ok) {
                    return action.payload.data.transactions;
                }
            }
        );

        builder.addCase(deleteTransactionAction.fulfilled, (state, action) => {
            if (action.payload.ok) {
                const transactionIndex = state.findIndex(action.payload.data);
                state.splice(transactionIndex, 1);

                return state;
            }
        });
    },
});

export default transactionsSlice.reducer;
