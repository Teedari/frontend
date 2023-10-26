import React from "react";
import ReactDOM from "react-dom/client";
// import "./assets/css/tailwind.css";
import "antd/dist/antd";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages";
import Dashboard from "./pages/dashboard";
import ListCustomers from "./pages/dashboard/customer";
import CustomerDetails from "./pages/dashboard/customer/CustomerDetails";
import ListTransactions from "./pages/dashboard/transaction";
import TransactionReport from "./pages/dashboard/transaction/TransactionReport";
import RegisterCustomer from "./pages/dashboard/customer/RegisterCustomer";
import ApplyForLoan from "./pages/dashboard/loan";
import AccountTransactions from "./pages/dashboard/transaction/AccountTransactions";
import CreateTransaction from "./pages/dashboard/transaction/CreateTransaction";
import ListLoans from "./pages/dashboard/loan/ListLoans";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/customer/register",
        element: <RegisterCustomer />,
      },
      {
        path: "/dashboard/customer/list",
        element: <ListCustomers />,
      },
      {
        path: "/dashboard/customer/:customerId",
        element: <CustomerDetails />,
      },
      {
        path: "/dashboard/transaction",
        element: <ListTransactions />,
      },
      {
        path: "/dashboard/transaction/create",
        element: <CreateTransaction />,
      },
      {
        path: "/dashboard/transaction/account/:accountId",
        element: <AccountTransactions />,
      },
      {
        path: "/dashboard/transaction/report",
        element: <TransactionReport />,
      },
      {
        path: "/dashboard/loan",
        element: <ApplyForLoan />,
      },
      {
        path: "/dashboard/loan/list",
        element: <ListLoans />,
      },
    ],
    errorElement: <PageNotFound />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
