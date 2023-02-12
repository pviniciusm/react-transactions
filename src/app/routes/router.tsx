import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/Home";
import { LoginPage } from "../../pages/Login";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <HomePage />,
    },
]);
