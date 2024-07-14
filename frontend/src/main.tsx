import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./routes/root";
import Users from "./routes/users";
import NewUser from "./routes/new-user";
import Transactions from "./routes/transactions";
import NewTransaction from "./routes/new-transaction";
import EditUser from "./routes/edit-user";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/users",
        element: <Users />,
    },
    {
        path: "/users/new",
        element: <NewUser />,
    },
    {
        path: "/users/edit/:id",
        element: <EditUser />,
    },
    {
        path: "/transactions",
        element: <Transactions />,
    },
    {
        path: "/transactions/new",
        element: <NewTransaction />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
