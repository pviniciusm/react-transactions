import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import {
    deleteTransactionAction,
    getAllTransactions,
    listTransactionsAction,
} from "../store/modules/transactionsSlice";
import { useNavigate } from "react-router-dom";

export const ListTransactions = () => {
    const user: any = useSelector<any>((state) => state.auth);
    const transactions: any = useSelector<any>(getAllTransactions);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const [type, setType] = useState("");

    const handleDelete = (id: string) => {
        console.log("Transacao: " + id);
        console.log("Usuario: " + user.id);

        dispatch(deleteTransactionAction({ id, userId: user.id }));
    };

    const submitForm = (event: any) => {
        event.preventDefault();

        const title = event.target.title.value;
        const type = event.target.type.value;

        console.log(title);

        dispatch(
            listTransactionsAction({
                id: user.id,
                title,
                type,
            })
        );
    };

    const handleChange = (event: any) => {
        const title = event.target.value;

        dispatch(
            listTransactionsAction({
                id: user.id,
                title,
                type,
            })
        );
    };

    return (
        <div>
            <p>Tabela de Transações:</p>
            <Button
                variant="contained"
                onClick={() => navigate("/transaction")}
            >
                Criar Transação
            </Button>

            <form onSubmit={submitForm}>
                <label>Title: </label>
                <input type="text" name="title" onChange={handleChange} />
                <br />

                <label>Type: </label>
                <select
                    name="type"
                    id="type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                >
                    <option value="">Selecione uma opção...</option>
                    <option value="income">Income</option>
                    <option value="outcome">Outcome</option>
                </select>

                <Button type="submit">Filtrar</Button>
            </form>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    onClick={() =>
                                        navigate(`/transaction/${row.id}`)
                                    }
                                >
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
