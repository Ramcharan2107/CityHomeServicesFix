import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import "./assets/styles/global.css";
import "./assets/styles/theme.css";
import "./assets/styles/layout.css";

import { BookingProvider } from "./context/BookingContext";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BookingProvider>
            <App />
        </BookingProvider>
    </React.StrictMode>
);