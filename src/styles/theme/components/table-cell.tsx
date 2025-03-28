import type { Components } from "@mui/material/styles";

import type { Theme } from "../types";

export const MuiTableCell = {
  styleOverrides: {
    root: { borderBottom: "var(--TableCell-borderWidth, 1px) solid var(--mui-palette-TableCell-border)",
      padding: "16px 8px",
      ["@media (max-width:600px)"]: { // медиазапрос для меньших экранов
        padding: "12px 4px", // уменьшенный отступ
      },
    },
    paddingCheckbox: { padding: "0 0 0 24px" },
  },
} satisfies Components<Theme>["MuiTableCell"];
