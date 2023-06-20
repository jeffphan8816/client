import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  useLocation,
  Route,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import { loader as itemDetailsLoader } from "./routes/search";
import Checkout from "./scenes/Checkout/Checkout.jsx";
import CheckoutConfirmation from "./scenes/Checkout/ConfirmCheckout.jsx";
import ErrorPage from "./scenes/ErrorPage";
import Home from "./scenes/Home";
import Layout from "./scenes/Layout";
import ItemDetails from "./scenes/ItemDetails";
import { rootLoader } from "./loaders/root";
import { itemLoader } from "./loaders/itemdetails";
import { checkoutLoader } from "./loaders/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Navigate to="/home" replace /> },
      { path: "home", element: <Home />, loader: rootLoader },
      {
        path: "item/:itemId",
        element: <ItemDetails />,
        loader: itemLoader,
      },
      {
        path: "checkout",
        children: [
          { index: true, element: <Checkout /> },
          {
            path: "success/:sessionId",
            element: <CheckoutConfirmation />,
            loader: checkoutLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
