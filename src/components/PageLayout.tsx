import React, { FC, ReactNode } from "react";
import { CENTER } from "../styles/const";
import { Stack } from "@mui/material";

interface IProps {
  maxWidth?: number;
  children: ReactNode;
}

const PageLayout: FC<IProps> = ({ maxWidth = 1350, children }) => {
  return (
    <Stack
      alignItems={CENTER}
      spacing={3}
      pt={1}
      pb={3}
      sx={{ maxWidth: maxWidth, width: "100%", marginLeft: "auto", marginRight: "auto" }}
    >
      {children}
    </Stack>
  );
};

export default PageLayout;
