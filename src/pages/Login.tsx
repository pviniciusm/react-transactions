import { Input } from "@mui/material";
import { Link } from "react-router-dom";
import { loginUser } from "../services/api.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/modules/authSlice";

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const submitForm = async (event: any) => {
        event.preventDefault();

        const { cpf, password } = event.target;

        const login = {
            cpf: cpf.value,
            password: password.value,
        };

        if (!login.cpf || !login.password) {
            alert("Preencha todos os campos");
            return;
        }

        const result = await dispatch(loginAction(login)).unwrap();

        if (!result.ok) {
            alert(result.message);
            return;
        }

        navigate("/");

        // const result = await loginUser(login);

        // if (!result.ok) {
        //     alert(result.message);
        //     return;
        // }

        // localStorage.setItem("user", JSON.stringify(result.data));

        // navigate("/");
    };

    return (
        <div>
            <h1>Bem vindo ao portal de transações</h1>
            <h2>Faça seu login</h2>

            <form onSubmit={submitForm}>
                <label htmlFor="cpf">Cpf</label>
                <input type="text" id="cpf" name="cpf" />

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Fazer login</button>
                <Link to="/cadastro">Cadastre-se</Link>
            </form>
        </div>
    );
};
