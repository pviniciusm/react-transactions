import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/router";
import { store } from "./app/store";

export const App = () => {
    return (
        <React.Fragment>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </React.Fragment>
    );
};
