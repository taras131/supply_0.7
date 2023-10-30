import React from "react";
import {Stack} from "@mui/material";
import ShipmentsList from "../components/ShipmentsList";
import ShipmentsInfo from "../components/ShipmentsInfo";
import PageHeader from "../components/PageHeader";
import {routes} from "../utils/routes";

const Shipments = () => {
    return (
        <Stack alignItems="center" spacing={4} pt={3}>
            <PageHeader route={routes.addNewShipments} title={" Отгрузки:"} buttonText={"Отгрузка"}/>
            <ShipmentsInfo/>
            <ShipmentsList/>
        </Stack>
    );
};

export default Shipments;