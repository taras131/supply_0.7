import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./store";
import "./firebase";
import Box from "@mui/material/Box";
import {ThemeProvider} from "@mui/material";
import {theme} from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Provider store={setupStore()}>
                    <Box sx={{backgroundColor: "whitesmoke", minHeight: "100vh"}}>
                        <App/>
                    </Box>
                </Provider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
);

reportWebVitals();
