import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/router";

export const App = () => {
    return (
        <React.Fragment>
            <RouterProvider router={router} />
        </React.Fragment>
    );
};
