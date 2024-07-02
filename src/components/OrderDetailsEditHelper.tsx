import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const OrderDetailsEditHelper = () => {
  const matches_700 = useMediaQuery("(min-width:700px)");
  return (
    <Grid container spacing={matches_700 ? 2 : 1} sx={{ maxWidth: 1350, width: "100%" }}>
      <Grid xs={matches_700 ? 6 : 12}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Typography>Позиции , в которых не заполнены наименования и номера при сохранении будут удалены</Typography>
        </Stack>
      </Grid>
      <Grid xs={matches_700 ? 6 : 12}>
        <Stack direction={"row"} spacing={3} alignItems={"center"}>
          <AddIcon color="primary" />
          <Typography>- добавляет позицию.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={3} alignItems={"center"}>
          <DeleteIcon />
          <Typography>- удаляет позицию (первую позицию удалить нельзя).</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OrderDetailsEditHelper;
