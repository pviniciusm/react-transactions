import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import {
    deleteTransaction,
    listTransactions,
} from "../../services/api.service";

export const listTransactionsAction = createAsyncThunk(
    "transactions/list",
    async (id: string) => {
        const result = await listTransactions(id);

        if (result.ok) {
            return result.data.transactions;
        }

        return [];
    }
);

export const deleteTransactionAction = createAsyncThunk(
    "transactions/delete",
    async (transaction: any) => {
        const result = await deleteTransaction(
            transaction.id,
            transaction.userId
        );
        return result.data;
    }
);

export const transactionsAdapter = createEntityAdapter<any>({
    selectId: (transaction: any) => transaction.id,
});

/*
{
    ids: [12, 'abc'],
    entities: {
        {id: 12, title: 'mercado'},
        {id: abc, title: 'mensalidade'}
    }
}
*/

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: transactionsAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            listTransactionsAction.fulfilled,
            transactionsAdapter.setAll
        );

        builder.addCase(
            deleteTransactionAction.fulfilled,
            transactionsAdapter.removeOne
        );
    },
});

export const transactionsSelector = (state: any) => state.transactions;
export const { selectAll: getAllTransactions } =
    transactionsAdapter.getSelectors<any>(transactionsSelector);

export default transactionsSlice.reducer;
