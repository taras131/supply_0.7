import React, {FC, useEffect, useState} from "react";
import {IOrder} from "../models/iOrders";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderPositionsList from "./OrderPositionsList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {getCurrentOrderIsEdit} from "../store/selectors/orders";
import OrdersListItemHeader from "./OrdersListItemHeader";

interface IProps {
    order: IOrder
    handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
    expanded: string | false
    isSelectPositionMode: boolean
}

const OrdersListItem: FC<IProps> = ({
                                        order,
                                        handleChange,
                                        expanded
                                        , isSelectPositionMode,
                                    }) => {
    const isEdit = useAppSelector(state => getCurrentOrderIsEdit(state));
    const navigate = useNavigate();
    const [backgroundColor, setBackgroundColor] = useState("grey");
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
                <OrdersListItemHeader order={order}/>
            </AccordionSummary>
            <AccordionDetails>
                <OrderPositionsList isEdit={isEdit}
                                    orderId={order.id}
                                    orderItems={order.orderItems}
                                    isSelectPositionMode={isSelectPositionMode}
                                    isLimitedOverview/>
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