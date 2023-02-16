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

export const loginUser = async (login: any): Promise<ApiResponse> => {
    try {
        const result = await api.post("/users/login", login);
        return result.data;
    } catch (error: any) {
        if (error.request?.response) {
            return JSON.parse(error.request?.response);
        }

        return {
            ok: false,
            message: error.toString(),
        };
    }
};

export const listTransactions = async (
    transaction: any
): Promise<ApiResponse> => {
    try {
        const result = await api.get(
            `/users/${transaction.id}/transactions?title=${
                transaction.title ?? ""
            }&type=${transaction.type ?? ""}`
        );
        console.log(result);

        return result.data;
    } catch (error: any) {
        console.log(error);
        if (error.request?.response) {
            return JSON.parse(error.request?.response);
        }

        return {
            ok: false,
            message: error.toString(),
        };
    }
};

export const deleteTransaction = async (
    id: string,
    userId: string
): Promise<ApiResponse> => {
    try {
        const result = await api.delete(`/users/${userId}/transactions/${id}`);
        console.log(result);

        return result.data;
    } catch (error: any) {
        console.log(error);
        if (error.request?.response) {
            return JSON.parse(error.request?.response);
        }

        return {
            ok: false,
            message: error.toString(),
        };
    }
};

interface UpdateTransactionProps {
    userId: string;
    id: string;
    title?: string;
    value?: "income" | "outcome";
}

export const updateTransaction = async (transaction: UpdateTransactionProps) => {
    try {
        const result = await api.put(
            `/users/${transaction.userId}/transactions/${transaction.id}`,
            transaction
        );
        return result.data;
    } catch (error: any) {
        console.log(error);
        if (error.request?.response) {
            return JSON.parse(error.request?.response);
        }

        return {
            ok: false,
            message: error.toString(),
        };
    }
};

export const createTransaction = async (transaction: any) => {
    try {
        const result = await api.post(
            `/users/${transaction.userId}/transactions`,
            transaction
        );
        return result.data;
    } catch (error: any) {
        console.log(error);
        if (error.request?.response) {
            return JSON.parse(error.request?.response);
        }

        return {
            ok: false,
            message: error.toString(),
        };
    }
};


interface UserBase {
    username: string;
}

interface UserLogin {
    username: string;
    password: string;
}

interface UserList {
    username: string;
    name: string;
    tasks: tasks[];
}

