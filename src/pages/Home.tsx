import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListTransactions } from "../components/ListTransactions";
import { listTransactionsAction } from "../store/modules/transactionsSlice";

export const HomePage = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const user: any = useSelector<any>((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (!user) {
            alert("É necessário realizar o login");
            navigate("/login");
            return;
        }

        setName(user.name);
        setId(user.id);

        dispatch(
            listTransactionsAction({
                id: user.id,
            })
        );
    }, []);

    // useEffect(() => {
    //     const loggedUser = localStorage.getItem("user");

    //     if (!loggedUser) {
    //         alert("É necessário realizar o login");
    //         navigate("/login");
    //         return;
    //     }

    //     const user = JSON.parse(loggedUser);
    //     setName(user.name);
    //     setId(user.id);
    // }, []);

    return (
        <div>
            <h1>Sistema de transações</h1>
            <p>Bem vindo {name}</p>
            <p>{id}</p>

            <hr />

            <ListTransactions />
        </div>
    );
};
