import type { Components } from "@mui/material/styles";

import type { Theme } from "../types";

export const MuiChip = {
    styleOverrides: {
        root: {
            fontWeight: 400,
            borderRadius: "15px",
        },
    },
} satisfies Components<Theme>["MuiChip"];