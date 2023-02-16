import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import {
    createTransaction,
    deleteTransaction,
    listTransactions,
    updateTransaction,
} from "../../services/api.service";

export const listTransactionsAction = createAsyncThunk(
    "transactions/list",
    async (transaction: any) => {
        const result = await listTransactions(transaction);

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

export const updateTransactionAction = createAsyncThunk(
    "transactions/update",
    async (transaction: any) => {
        const result = await updateTransaction(transaction);
        let changes = {};

        if (result.ok) {
            changes = {
                title: transaction.title,
                value: transaction.value,
            };
        }

        return {
            id: transaction.id,
            changes,
            ok: result.ok,
        };
    }
);

export const createTransactionAction = createAsyncThunk(
    "transactions/create",
    async (transaction: any) => {
        const result = await createTransaction({
            ...transaction,
            type: "income",
        });

        console.log(result);

        if (result.ok) {
            return {
                ok: true,
                data: result.data.transactions,
            };
        }

        // to-do: verificar
        return {
            ok: false,
        };
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

        builder.addCase(
            updateTransactionAction.fulfilled,
            transactionsAdapter.updateOne
        );

        builder.addCase(createTransactionAction.fulfilled, (state, action) =>
            transactionsAdapter.setAll(state, action.payload.data)
        );
    },
});

export const transactionsSelector = (state: any) => state.transactions;
export const { selectAll: getAllTransactions, selectById: getTransaction } =
    transactionsAdapter.getSelectors<any>(transactionsSelector);

export default transactionsSlice.reducer;
