import React, {FC, useEffect, useState} from "react";
import {IOrder} from "../models/iOrders";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    Typography,
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderPositionsList from "./OrderPositionsList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {getCurrentOrderIsEdit} from "../store/selectors/orders";
import OrdersListItemHeader from "./OrdersListItemHeader";
import {APPROVED_GRADIENT, SUCCESS_GRADIENT, WHITE_COLOR} from "../styles/const";
import {getIsCompleteOrder} from "../utils/services";

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
    const {pathname} = useLocation();
    const [background, setBackground] = useState(WHITE_COLOR);
    const handleMoreClick = () => {
        navigate(`${routes.orders}/${order.id}`, {state: {from: pathname}});
    };
    useEffect(() => {
        setBackground(WHITE_COLOR);
        if (order.approved.isApproved) {
            setBackground(APPROVED_GRADIENT);
        }
        if (getIsCompleteOrder(order.orderItems)) {
            setBackground(SUCCESS_GRADIENT);
        }
    }, [order.approved.isApproved, order.orderItems]);
    return (
        <Accordion expanded={expanded === order.id} onChange={handleChange} sx={{width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id={order.id}
                sx={{background: background}}
            >
                <OrdersListItemHeader order={order}/>
            </AccordionSummary>
            <AccordionDetails sx={{padding: "0 0 12px 0"}}>
                <OrderPositionsList isEdit={isEdit}
                                    orderId={order.id}
                                    orderItems={order.orderItems}
                                    isSelectPositionMode={isSelectPositionMode}
                                    isLimitedOverview/>
                {!isSelectPositionMode && (
                    <Stack direction={"row"}
                           alignItems={"center"}
                           spacing={2}
                           justifyContent={"end"}
                           sx={{width: "100%", cursor: "pointer"}}
                           onClick={handleMoreClick}
                           mt={2} pr={2}>
                        <Typography>
                            Подробнее
                        </Typography>
                        <MoreHorizIcon color={"primary"}/>
                    </Stack>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default OrdersListItem;