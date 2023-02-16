import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
    createTransactionAction,
    getTransaction,
    updateTransactionAction,
} from "../store/modules/transactionsSlice";

export const TransactionPage = () => {
    const { id } = useParams();

    const transaction: any = useSelector<any>((state) =>
        getTransaction(state, id ?? "")
    );

    const user: any = useSelector<any>((state) => state.auth);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {
        if (transaction) {
            setTitle(transaction.title);
            setValue(transaction.value);
        }
    }, []);

    const submitForm = async (event: any) => {
        event.preventDefault();

        const transactionData = {
            title,
            value,
            id,
            userId: user.id,
        };

        const result = await dispatch(
            transaction
                ? updateTransactionAction(transactionData)
                : createTransactionAction(transactionData)
        ).unwrap();

        if (result.ok) {
            navigate("/");
        }
    };

    return (
        <div>
            <h1>Página da transação</h1>
            <p>{id}</p>

            <form onSubmit={submitForm}>
                <label>Title: </label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <br />
                <label>Value: </label>
                <input
                    type="text"
                    name="value"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                <br />

                <Button variant="contained" type="submit">
                    Salvar
                </Button>
                <Button onClick={() => navigate("/")}>Voltar</Button>
            </form>
        </div>
    );
};
