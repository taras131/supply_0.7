import type { Components } from "@mui/material/styles";

import type { Theme } from "../types";

export const MuiChip = {
    styleOverrides: {
        root: {
            fontWeight: 500,
            borderRadius: "5px",
        },
    },
} satisfies Components<Theme>["MuiChip"];