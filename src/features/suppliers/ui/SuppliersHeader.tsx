import React, {FC} from "react";
import { Button, Stack, Typography } from "@mui/material";

interface IProps {
    handleAddClick: () => void;
}

const SuppliersHeader:FC<IProps> = ({handleAddClick}) => {
  return (
    <Stack sx={{ maxWidth: 1000, width: "100%" }}
           direction="row"
           alignItems="center"
           justifyContent="space-between">
      <Typography variant="h2" fontSize="24px" fontWeight={700}>
        Поставщики
      </Typography>
      <Button variant="contained" size="large" onClick={handleAddClick}>
        Добавить
      </Button>
    </Stack>
  );
};

export default SuppliersHeader;
