import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { ROW, SPACE_BETWEEN } from "../styles/const";

interface IProps {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
  width?: string;
}

const TitleWithValue: FC<IProps> = ({ title, value, width = "100%", children }) => {
  return (
    <Stack sx={{ width: width }} direction={ROW} alignItems="center" justifyContent={SPACE_BETWEEN}>
      <Typography color="gray" fontWeight={600}>
        {title}
      </Typography>
      {value ? <Typography fontWeight={600}>{value}</Typography> : children}
    </Stack>
  );
};

export default TitleWithValue;
