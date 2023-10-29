import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Typography} from "@mui/material";
import MainMenuListItem from "./MainMenuListItem";
import {routes} from "../utils/routes";
import InvoicesInfo from "./InvoicesInfo";
import ShipmentsInfo from "./ShipmentsInfo";

const MainMenuList = () => {
    return (
        <Grid container spacing={4} sx={{maxWidth: "1000px", width: "100%"}}>
            <MainMenuListItem title={"Счета"} route={routes.invoices}>
                <InvoicesInfo/>
            </MainMenuListItem>
            <MainMenuListItem title={"Отгрузки"} route={routes.shipments}>
                <ShipmentsInfo/>
            </MainMenuListItem>
            <MainMenuListItem title={"Сотрудники"} route={routes.users}>
                <Typography>

                </Typography>
            </MainMenuListItem>
            <MainMenuListItem title={"Поставщики"} route={routes.shipments}>
                <Typography>

                </Typography>
            </MainMenuListItem>
        </Grid>
    );
};

export default MainMenuList;