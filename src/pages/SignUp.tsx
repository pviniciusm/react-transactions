import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createUser } from "../app/services/api.service";
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
    const navigator = useNavigate();

    const submitForm = async (event: any) => {
        event.preventDefault();

        const { name, email, password, cpf } = event.target;

        if ([name.value, email.value, password.value, cpf.value].some((item) => !item)) {
            alert("Preencha todos os campos");
            return;
        }

        setLoading(true);

        const result = await createUser({
            name: name.value,
            email: email.value,
            password: password.value,
            cpf: cpf.value,
            age: 20,
        });

        console.log(result);
        alert(result.message);

        if (result.ok) {
            navigator("/login");
        }

        setLoading(false);
    };

    return (
        <FormWrapper>
            <h1>Cadastre-se no sistema</h1>
            <h3>Preencha os campos abaixo</h3>

            <Form onSubmit={submitForm}>
                <Input label="Nome" type="text" name="name" id="name" />
                <Input label="CPF" type="text" name="cpf" id="cpf" inputProps={{ maxLength: 11 }} />
                <Input label="Email" type="email" name="email" id="email" />
                <Input label="Senha" type="password" name="password" id="password" />

                <br />
                <Button variant="contained" type="submit" disabled={loading}>
                    Cadastrar
                </Button>
            </Form>
        </FormWrapper>
    );
};
