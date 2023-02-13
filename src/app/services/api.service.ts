import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333",
});

export const createUser = async (data: any) => {
    try {
        const result = await api.post("/users", data);
        console.log(result);

        return result.data;
    } catch (error: any) {
        if (error.request) {
            return JSON.parse(error.request.response);
        }

        return {
            ok: false,
            error: error.toString(),
        };
    }
};
