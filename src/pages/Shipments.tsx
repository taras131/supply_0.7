import React from "react";
import ShipmentsHeader from "../components/ShipmentsHeader";
import {Stack} from "@mui/material";
import ShipmentsList from "../components/ShipmentsList";

const Shipments = () => {
    return (
        <Stack style={{minHeight: "calc(100vh - 120px"}} alignItems="center">
            <ShipmentsHeader/>
            <ShipmentsList/>
        </Stack>
    );
};

export default Shipments;