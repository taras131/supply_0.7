import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { APPROVED_GRADIENT, CANCEL_GRADIENT, SUCCESS_GRADIENT } from "styles/const";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const OrdersHelper = () => {
  const matches_700 = useMediaQuery("(min-width:700px)");
  return (
    <Grid container spacing={matches_700 ? 2 : 1} sx={{ maxWidth: 1350, width: "100%" }}>
      <Grid xs={matches_700 ? 6 : 12}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <div
            style={{
              height: "35px",
              width: "35px",
              backgroundColor: "white",
              border: "1px solid black",
            }}
          ></div>
          <Typography>- новая заявка</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
          <div style={{ height: "35px", width: "35px", background: APPROVED_GRADIENT }}></div>
          <Typography>- заявка , одобренная к работе.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
          <div style={{ height: "35px", width: "35px", background: SUCCESS_GRADIENT }}></div>
          <Typography>- выполненная заявка.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
          <div style={{ height: "35px", width: "35px", background: CANCEL_GRADIENT }}></div>
          <Typography>- отменённая заявка.</Typography>
        </Stack>
      </Grid>
      <Grid xs={matches_700 ? 6 : 12}>
        <Stack direction={"row"} spacing={3} alignItems={"center"}>
          <AirplanemodeActiveIcon />
          <Typography>- нужна авив доставка.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={3} alignItems={"center"} mt={matches_700 ? 2 : 1}>
          <DirectionsSubwayIcon />
          <Typography>- нужна ЖД доставка.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={3} alignItems={"center"} mt={matches_700 ? 2 : 1}>
          <KeyboardArrowDownIcon />
          <Typography>- разыернуть содержимое заявки.</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OrdersHelper;
