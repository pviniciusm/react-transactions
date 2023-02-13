import { Button, Input, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../app/services/api.service";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const { cpf, password } = event.target;

        if ([cpf.value, password.value].some((item) => !item)) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }

        const result = await login({
            cpf: cpf.value,
            password: password.value,
        });

        alert(result.message);

        if (result.ok) {
            console.log(result.data);
            navigate("/");
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
