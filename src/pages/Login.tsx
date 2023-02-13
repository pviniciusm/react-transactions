import { Input } from "@mui/material";

export const LoginPage = () => {
    return (
        <div>
            <h1>Bem vindo ao portal de transações</h1>
            <h2>Faça seu login</h2>

            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Fazer login</button>
                <button type="submit">Cadastre-se</button>
            </form>
        </div>
    );
};
