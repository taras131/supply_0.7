import React, {FC, useEffect, useState} from "react";
import {IOrder} from "../models/iOrders";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    Typography,
} from "@mui/material";
import {convertMillisecondsToDate} from "../utils/services";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getUserFullNameById} from "../store/selectors/auth";
import ApprovedOrderCheckbox from "./ApprovedOrderCheckbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import OrderPositionsList from "./OrderPositionsList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface IProps {
    order: IOrder
    handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
    expanded: string | false
    isSelectPositionMode: boolean
}

const OrdersListItem: FC<IProps> = ({order,
                                        handleChange,
                                        expanded
                                        ,isSelectPositionMode}) => {
    const navigate = useNavigate();
    const [backgroundColor, setBackgroundColor] = useState("grey");
    const authorFullName = useAppSelector(state => getUserFullNameById(state, order.author.userId)) || "";
    useEffect(() => {
        if (order.approved.isApproved) {
            setBackgroundColor("white");
        } else {
            setBackgroundColor("grey");
        }
    }, [order.approved.isApproved]);
    const handleMoreClick = () => {
        navigate(`${routes.orders}/${order.id}`);
    };
    return (
        <Accordion expanded={expanded === order.id} onChange={handleChange} sx={{width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id={order.id}
                sx={{backgroundColor: "white"}}
            >
                <Grid sx={{width: "100%"}} container spacing={1} alignItems={"center"}>
                    <Grid xs={2}>
                        <Stack direction={"row"} spacing={1} alignItems={"center"}>
                            <Typography>
                                Одобрена
                            </Typography>
                            <ApprovedOrderCheckbox order={order}/>
                        </Stack>
                    </Grid>
                    <Grid xs={2}>
                        <Typography sx={{flexShrink: 0}} fontWeight={600}>
                            {convertMillisecondsToDate(order.author.dateCreating)}
                        </Typography>
                    </Grid>
                    <Grid xs={5}>
                        <Typography sx={{flexShrink: 0}} fontWeight={600}>
                            {order.title}
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography sx={{flexShrink: 0}}>
                            {authorFullName}
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
            </AccordionSummary>
            <AccordionDetails>
                <OrderPositionsList orderId ={order.id} positions={order.orderItems} isSelectPositionMode={isSelectPositionMode}/>
                <Stack direction={"row"} alignItems={"center"} spacing={2} justifyContent={"end"}
                       sx={{width: "100%", cursor: "pointer", mt: 2}} onClick={handleMoreClick}>
                    <Typography>
                        Подробнее
                    </Typography>
                    <MoreHorizIcon color={"primary"}/>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default OrdersListItem;