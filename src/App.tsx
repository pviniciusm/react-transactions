import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export const App = () => {
    return (
        <React.Fragment>
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </PersistGate>
        </React.Fragment>
    );
};
