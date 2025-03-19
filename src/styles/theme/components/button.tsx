import type { Components } from "@mui/material/styles";

import type { Theme } from "../types";

export const MuiButton = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        borderRadius: "5px",
        textTransform: "none",
        fontSize: "14px", // Базовый размер текста для кнопок
        padding: "8px 20px", // Базовый padding для кнопок sizeMedium
        [theme.breakpoints.down(850)]: {
          fontSize: "12px", // Размер текста уменьшается на меньших экранах
          padding: "6px 16px", // Уменьшаем padding
        },
      };
    },
  },
} satisfies Components<Theme>["MuiButton"];
