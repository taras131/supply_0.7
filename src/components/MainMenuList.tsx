import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack, useMediaQuery } from "@mui/material";
import MainMenuListItem from "./MainMenuListItem";
import { routes } from "../utils/routes";
import InvoicesInfo from "features/invoices/ui/InvoicesInfo";
import ShipmentsInfo from "features/shipments/ui/ShipmentsInfo";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { CENTER, PRIMARY } from "../styles/const";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EditNoteIcon from "@mui/icons-material/EditNote";
import OrdersInfo from "features/orders/ui/OrdersInfo";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import SuppliersInfo from "./SuppliersInfo";

const MainMenuList = () => {
  const matches_800 = useMediaQuery("(min-width:500px)");
  return (
    <Grid container spacing={matches_800 ? 4 : 2} sx={{ maxWidth: "1000px", width: "100%" }}>
      <MainMenuListItem title={"Счета"} route={routes.invoices}>
        <Stack sx={{ width: "100" }} alignItems={CENTER} spacing={2}>
          <ReceiptIcon sx={{ fontSize: "120px" }} color={PRIMARY} />
          <InvoicesInfo />
        </Stack>
      </MainMenuListItem>
      <MainMenuListItem title={"Отгрузки"} route={routes.shipments}>
        <Stack sx={{ width: "100" }} alignItems={CENTER} spacing={2}>
          <LocalShippingIcon sx={{ fontSize: "120px" }} color={PRIMARY} />
          <ShipmentsInfo />
        </Stack>
      </MainMenuListItem>
      <MainMenuListItem title={"Заявки"} route={routes.orders}>
        <Stack sx={{ width: "100" }} alignItems={CENTER} spacing={2}>
          <EditNoteIcon sx={{ fontSize: "120px" }} color={PRIMARY} />
          <OrdersInfo />
        </Stack>
      </MainMenuListItem>
      <MainMenuListItem title={"Поставщики"} route={routes.suppliers}>
        <Stack sx={{ width: "100" }} alignItems={CENTER} spacing={2}>
          <AccessibleForwardIcon sx={{ fontSize: "120px" }} color={PRIMARY} />
          <SuppliersInfo />
        </Stack>
      </MainMenuListItem>
    </Grid>
  );
};

export default MainMenuList;
