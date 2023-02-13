import { Button, Input, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../app/services/api.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../app/store/modules/auth/authSlice";

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const { cpf, password } = event.target;

        if ([cpf.value, password.value].some((item) => !item)) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }

        try {
            const actionResult = await dispatch(
                loginAction({
                    cpf: cpf.value,
                    password: password.value,
                })
            ).unwrap();
            console.log(actionResult);

            alert(actionResult.message);

            if (actionResult.ok) {
                navigate("/");
            }
        } catch (error: any) {
            alert("erro");
            console.log(error.toString());
        }
    };

    return (
        <div>
            <h1>Bem vindo ao portal de transações</h1>
            <h2>Faça seu login</h2>

            <form onSubmit={handleSubmit}>
                <TextField label="CPF" type="text" id="cpf" name="cpf" inputProps={{ maxLength: 11 }} />
                <TextField label="Password" type="password" id="password" name="password" />

                <Button variant="contained" type="submit">
                    Fazer login
                </Button>
                <Link to={"/cadastro"}>
                    <Button variant="outlined" type="button">
                        Cadastre-se
                    </Button>
                </Link>
            </form>
        </div>
    );
};
