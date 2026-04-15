import React from "react";
import { RouterProvider } from "react-router";
import { ProductProvider } from "./features/products/product.context";
import { router } from "./app.routes";


const App = () => {
    return (
        <ProductProvider>
            <RouterProvider router={router} />
        </ProductProvider>
    );
};

export default App;
