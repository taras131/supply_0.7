import React from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useAppSelector } from "hooks/redux";
import { CENTER, COLUMN, ROW, START } from "styles/const";
import {getCurrentAnnualOrders, getNumberAnnualOrders} from "features/orders/model/selectors";

const OrdersInfo = () => {
  const matches_500 = useMediaQuery("(min-width:500px)");
  const matches_400 = useMediaQuery("(min-width:400px)");
  const numberAnnualOrders = useAppSelector((state) => getNumberAnnualOrders(state));
  const numberCurrentOrders = useAppSelector((state) => getCurrentAnnualOrders(state));
  return (
    <Stack
      sx={{ maxWidth: 1000, width: "100%" }}
      direction={matches_400 ? ROW : COLUMN}
      alignItems={matches_400 ? CENTER : START}
      justifyContent={START}
      spacing={matches_400 ? 2 : 1}
    >
      <Stack direction={ROW} spacing={1}>
        <Typography color={"gray"} fontSize={matches_500 ? "16px" : "12px"} fontWeight={matches_500 ? 600 : 500}>
          Годовых заявок:
        </Typography>
        <Typography color={"darkblue"} fontSize={matches_500 ? "16px" : "12px"} fontWeight={matches_500 ? 600 : 500}>
          {numberAnnualOrders}.
        </Typography>
      </Stack>
      <Stack direction={ROW} spacing={1}>
        <Typography color={"gray"} fontSize={matches_500 ? "16px" : "12px"} fontWeight={matches_500 ? 600 : 500}>
          Текущих заявок:
        </Typography>
        <Typography color={"darkblue"} fontSize={matches_500 ? "16px" : "12px"} fontWeight={matches_500 ? 600 : 500}>
          {numberCurrentOrders}.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default OrdersInfo;
