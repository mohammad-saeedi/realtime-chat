import React from "react";
import ReactDom from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./app";

const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(
    <BrowserRouter>
        <App /> 
    </BrowserRouter>
)
