import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();
    const auth: any = useSelector<any>((state) => state.auth);

    useEffect(() => {
        console.log(auth);

        const loggedUser = auth.logged;

        if (loggedUser) {
            const user = auth.user;
            alert("O usuario " + user.id + " está logado");
        } else {
            alert("Não há usuário logado");
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <h1>
                Bem vindo, <span>{auth.user.name}</span>
            </h1>
            <p>{auth.user.id}</p>
        </div>
    );
};
