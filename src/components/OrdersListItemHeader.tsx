import React, {FC} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import ApprovedOrderCheckbox from "./ApprovedOrderCheckbox";
import {convertMillisecondsToDate} from "../utils/services";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import {IOrder} from "../models/iOrders";
import {useAppSelector} from "../hooks/redux";
import {getUserFullNameById} from "../store/selectors/auth";

interface IProps {
    order: IOrder
}

const OrdersListItemHeader: FC<IProps> = ({order}) => {
    const matches_700 = useMediaQuery("(min-width:700px)");
    const authorFullName = useAppSelector(state => getUserFullNameById(state, order.author.userId)) || "";
    return (
        <Grid sx={{width: "100%"}} container spacing={1} alignItems={"center"}>
            {matches_700 && (
                <Grid xs={2}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Typography>
                            Одобрена
                        </Typography>
                        <ApprovedOrderCheckbox order={order}/>
                    </Stack>
                </Grid>
            )}
            <Grid xs={2}>
                <Typography sx={{flexShrink: 0}} fontWeight={600}>
                    {convertMillisecondsToDate(order.author.dateCreating)}
                </Typography>
            </Grid>
            <Grid xs={matches_700 ? 7 : 9}>
                <Typography sx={{flexShrink: 0}} fontWeight={600}>
                    {order.title}
                </Typography>
            </Grid>
            <Grid xs={1}>
                <Grid container direction="row-reverse" sx={{marginRight: "16px"}}>
                    {order.shipmentType === "air"
                        ? (<AirplanemodeActiveIcon/>)
                        : (<DirectionsSubwayIcon/>)}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrdersListItemHeader;