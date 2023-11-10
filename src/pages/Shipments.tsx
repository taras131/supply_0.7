import React from "react";
import {Stack, useMediaQuery} from "@mui/material";
import ShipmentsList from "../components/ShipmentsList";
import ShipmentsInfo from "../components/ShipmentsInfo";
import PageHeader from "../components/PageHeader";
import {routes} from "../utils/routes";
import ShipmentsHelper from "../components/ShipmentsHelper";
import {CENTER} from "../styles/const";

const Shipments = () => {
    const matches_700 = useMediaQuery("(min-width:700px)");
    return (
        <Stack alignItems={CENTER} spacing={matches_700 ? 4 : 2} pt={matches_700 ? 3 : 1}>
            <PageHeader route={routes.addNewShipments}
                        title={" Отгрузки:"}
                        buttonText={"Отгрузка"}
                        maxWidth={"1000px"}/>
            <ShipmentsInfo/>
            <ShipmentsList/>
            <ShipmentsHelper/>
        </Stack>
    );
};

export default Shipments;