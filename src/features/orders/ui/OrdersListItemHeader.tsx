import React, { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { convertMillisecondsToDate, deleteYearFromString } from "utils/services";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import { IOrder } from "models/iOrders";
import { CENTER } from "styles/const";

interface IProps {
  order: IOrder;
}

const OrdersListItemHeader: FC<IProps> = ({ order }) => {
  const matches_870 = useMediaQuery("(min-width:870px)");
  const matches_430 = useMediaQuery("(min-width:420px)");
  const matches_600 = useMediaQuery("(min-width:600px)");
  // const authorFullName = useAppSelector(state => getUserFullNameById(state, order.author.userId)) || "";
  const dateCreating = convertMillisecondsToDate(order.author.dateCreating);
  return (
    <Grid sx={{ width: "100%" }}
          alignItems={CENTER}
          container
          spacing={matches_600 ? 1 : 0}
          columns={18} pr={1}>
      {matches_430 && (
        <Grid xs={2}>
          <Typography sx={{ flexShrink: 0 }} fontWeight={600}>
            {matches_870 ? dateCreating : deleteYearFromString(dateCreating)}
          </Typography>
        </Grid>
      )}
      <Grid xs={matches_430 ? 15 : 17}>
        <Typography sx={{ flexShrink: 0 }} fontWeight={600}>
          {order.title}
        </Typography>
      </Grid>
      <Grid xs={1} sx={{ margin: 0, padding: 0 }}>
        <Stack alignItems={CENTER} justifyContent={CENTER}>
          {order.shipmentType === "air" ? <AirplanemodeActiveIcon /> : <DirectionsSubwayIcon />}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default OrdersListItemHeader;
