import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import "./firebase";
import "./styles/global.css";
import Box from "@mui/material/Box";
import { CustomThemeProvider } from "./components/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={setupStore()}>
                <CustomThemeProvider>
                    <Box sx={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
                        <App />
                    </Box>
                </CustomThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
