import React, {FC} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Typography, useMediaQuery} from "@mui/material";
import {convertMillisecondsToDate, deleteYearFromString} from "../utils/services";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import {IShipments} from "../models/iShipments";
import {CENTER} from "../styles/const";

interface IProps {
    shipment: IShipments
}

const ShipmentHeader: FC<IProps> = ({shipment}) => {
    const matches_430 = useMediaQuery("(min-width:420px)");
    const matches_600 = useMediaQuery("(min-width:600px)");
    const matches_700 = useMediaQuery("(min-width:700px)");
    const matches_730 = useMediaQuery("(min-width:730px)");
    const createdDate = convertMillisecondsToDate(shipment.author.dateCreating)
    return (
        <Grid sx={{width: "100%"}} alignItems={CENTER} container spacing={matches_600 ? 1 : 0} columns={18} pr={1}>
            {matches_430 && (
                <Grid xs={2}>
                    <Typography sx={{flexShrink: 0}} fontWeight={600}>
                        {matches_730 ? createdDate : deleteYearFromString(createdDate)}
                    </Typography>
                </Grid>
            )}
            <Grid xs={matches_430 ? 8 : 9}>
                <Typography sx={{flexShrink: 0}} fontWeight={600}>
                    {shipment.transporter}
                </Typography>
            </Grid>
            <Grid xs={matches_430 ? 7 : 8}>
                <Typography sx={{flexShrink: 0}} fontWeight={600} ml={1}>
                    {shipment.ladingNumber}
                </Typography>
            </Grid>
            <Grid xs={1} sx={{margin: 0, padding: 0}}>
                {shipment.type === "air"
                    ? (<AirplanemodeActiveIcon/>)
                    : (<DirectionsSubwayIcon/>)}
            </Grid>
        </Grid>
    );
};

export default ShipmentHeader;