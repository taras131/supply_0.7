import React, {FC} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Typography} from "@mui/material";
import {convertMillisecondsToDate} from "../utils/services";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import {IShipments} from "../models/iShipments";

interface IProps {
    shipment: IShipments
}

const ShipmentHeader:FC<IProps> = ({shipment}) => {
    return (
        <Grid sx={{width: "100%"}} container spacing={1} alignItems={"center"}>
            <Grid xs={2}>
                <Typography sx={{flexShrink: 0}} fontWeight={600}>
                    {convertMillisecondsToDate(shipment.author.dateCreating)}
                </Typography>
            </Grid>
            <Grid xs={4}>
                <Typography sx={{flexShrink: 0}} fontWeight={600}>
                    {shipment.transporter}
                </Typography>
            </Grid>
            <Grid xs={5}>
                <Typography sx={{flexShrink: 0}} fontWeight={600} ml={1}>
                    № {shipment.ladingNumber}
                </Typography>
            </Grid>
            <Grid xs={1}>
                <Grid container direction="row-reverse" sx={{marginRight: "16px"}}>
                    {shipment.type === "air"
                        ? (<AirplanemodeActiveIcon/>)
                        : (<DirectionsSubwayIcon/>)}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ShipmentHeader;