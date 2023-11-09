import React, {FC} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import ApprovedOrderCheckbox from "./ApprovedOrderCheckbox";
import {convertMillisecondsToDate, deleteYearFromString} from "../utils/services";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import {IOrder} from "../models/iOrders";

interface IProps {
    order: IOrder
}

const OrdersListItemHeader: FC<IProps> = ({order}) => {
    const matches_870 = useMediaQuery("(min-width:870px)");
    const matches_700 = useMediaQuery("(min-width:700px)");
   // const authorFullName = useAppSelector(state => getUserFullNameById(state, order.author.userId)) || "";
    const dateCreating = convertMillisecondsToDate(order.author.dateCreating);
    return (
        <Grid sx={{width: "100%"}} container alignItems={"center"} spacing={1}>
            {matches_700 && (
                <Grid xs={"auto"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <ApprovedOrderCheckbox order={order}/>
                        {matches_700 && (
                            <Typography>
                                Одобрена
                            </Typography>
                        )}
                    </Stack>
                </Grid>
            )}
            <Grid xs={7}>
                <Typography sx={{flexShrink: 0}} fontWeight={600}>
                    {order.title}
                </Typography>
            </Grid>
            <Grid xs>
                <Typography sx={{flexShrink: 0}} fontWeight={600}>
                    {matches_870 ? dateCreating : deleteYearFromString(dateCreating)}
                </Typography>
            </Grid>
            <Grid xs>
                <Grid container direction="row-reverse" sx={{padding: "6px"}}>
                    {order.shipmentType === "air"
                        ? (<AirplanemodeActiveIcon/>)
                        : (<DirectionsSubwayIcon/>)}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OrdersListItemHeader;