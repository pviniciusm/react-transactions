import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333",
});

export interface ApiResponse {
    ok: boolean;
    data?: any;
    message: string;
}

export const createUser = async (user: any): Promise<ApiResponse> => {
    try {
        const result = await api.post("/users", user);
        return result.data;
        /*
        {
            ok: true,
            message: "...",
            data: {...}
        }
        */
    } catch (error: any) {
        if (error.request?.response) {
            console.log(error.request.response);
            const result = error.request.response;
            return JSON.parse(result);
        }

        return {
            ok: false,
            message: error.toString(),
        };
        /*
        {
            ok: false,
            message: "...",
        }
        */
    }
};
