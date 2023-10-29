import React from "react";
import ShipmentsHeader from "../components/ShipmentsHeader";
import {Stack} from "@mui/material";
import ShipmentsList from "../components/ShipmentsList";
import ShipmentsInfo from "../components/ShipmentsInfo";

const Shipments = () => {
    return (
        <Stack alignItems="center" spacing={3}>
            <ShipmentsHeader/>
            <ShipmentsInfo/>
            <ShipmentsList/>
        </Stack>
    );
};

export default Shipments;