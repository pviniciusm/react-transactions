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
} from "../store/modules/transactionsSlice";

export const ListTransactions = () => {
    const user: any = useSelector<any>((state) => state.auth);
    const transactions: any = useSelector<any>(getAllTransactions);
    const dispatch = useDispatch<any>();

    const handleDelete = (id: string) => {
        console.log("Transacao: " + id);
        console.log("Usuario: " + user.id);

        dispatch(deleteTransactionAction({ id, userId: user.id }));
    };

    return (
        <div>
            <p>Tabela de Transações:</p>
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
                                <TableCell component="th" scope="row">
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
