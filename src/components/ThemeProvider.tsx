import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { createTheme } from "../styles/theme/create-theme";
import EmotionCache from "./EmotionCache";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function CustomThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
    const theme = createTheme();

    return (
        <EmotionCache options={{ key: "mui" }}>
            <CssVarsProvider theme={theme} defaultMode="light">
                <CssBaseline />
                {children}
            </CssVarsProvider>
        </EmotionCache>
    );
}