import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

export const TransactionPage = () => {
    const { id } = useParams();
    const transaction = useSelector<any>((state) => state.getTransaction());

    const submitForm = (event: any) => {
        event.preventDefault();
        console.log(event);
    };

    return (
        <div>
            <h1>Página da transação</h1>
            <p>{id}</p>

            <form onSubmit={submitForm}>
                <input type="text" name="title" />
                <input type="text" name="value" />
                <br />

                <Button type="submit">Salvar</Button>
            </form>
        </div>
    );
};
