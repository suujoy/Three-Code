import { createBrowserRouter } from "react-router";
import CocaCola from "./features/products/pages/CocaCola";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <CocaCola />,
    },
]);
