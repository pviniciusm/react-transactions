import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createUser } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const Input = styled(TextField)(() => ({
    marginTop: "12px",
}));

const Form = styled("form")(() => ({
    display: "flex",
    flexDirection: "column",
}));

const FormWrapper = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    width: "50%",
    margin: "auto",
    border: "1px solid #ccc",
    padding: "12px",
    marginTop: "12px",
}));

export const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (event: any) => {
        event.preventDefault();

        const { name, cpf, email, password, age } = event.target;

        const user = {
            name: name.value,
            cpf: cpf.value,
            email: email.value,
            password: password.value,
            age: age.value,
        };

        if (
            !user.name ||
            !user.cpf ||
            !user.email ||
            !user.password ||
            !user.age
        ) {
            alert("Preencha todos os campos");
            return;
        }

        const result = await createUser(user);

        if (result.ok) {
            alert("Usuário criado com sucesso!!!");

            navigate("/login");

            return;
        }

        alert(result.message.toString());
    };

    return (
        <FormWrapper>
            <h1>Cadastre-se no sistema</h1>
            <h3>Preencha os campos abaixo</h3>

            <Form onSubmit={submitForm}>
                <Input label="Nome" type="text" name="name" id="name" />
                <Input
                    label="CPF"
                    type="text"
                    name="cpf"
                    id="cpf"
                    inputProps={{ maxLength: 11 }}
                />
                <Input label="Email" type="email" name="email" id="email" />
                <Input label="Age" type="number" name="age" id="age" />
                <Input
                    label="Senha"
                    type="password"
                    name="password"
                    id="password"
                />

                <br />
                <Button variant="contained" type="submit" disabled={loading}>
                    Cadastrar
                </Button>
            </Form>
        </FormWrapper>
    );
};
