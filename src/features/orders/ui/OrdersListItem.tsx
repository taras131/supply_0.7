import React, {FC, useEffect, useState} from "react";
import {IOrder} from "models/iOrders";
import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography, useMediaQuery} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "utils/routes";
import {useAppSelector} from "hooks/redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderPositionsList from "features/orders/ui/OrderPositionsList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OrdersListItemHeader from "features/orders/ui/OrdersListItemHeader";
import {
    APPROVED_GRADIENT, CANCEL_GRADIENT,
    CENTER,
    CURSOR_POINTER,
    ROW,
    SPACE_BETWEEN,
    SUCCESS_GRADIENT,
    WHITE_COLOR,
} from "styles/const";
import {getIsCompleteOrder} from "utils/services";
import OrderApprovedCheckbox from "features/orders/ui/OrderApprovedCheckbox";
import {getCurrentOrderIsEdit} from "features/orders/model/selectors";

interface IProps {
    order: IOrder;
    handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
    expanded: string | false;
    isSelectPositionMode: boolean;
}

const OrdersListItem: FC<IProps> = ({order, handleChange, expanded, isSelectPositionMode}) => {
    const isEdit = useAppSelector((state) => getCurrentOrderIsEdit(state));
    const matches_600 = useMediaQuery("(min-width:600px)");
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
        if (order.isCancelled) {
            setBackground(CANCEL_GRADIENT);
        }
    }, [order.approved.isApproved, order.orderItems]);
    return (
        <Accordion expanded={expanded === order.id} onChange={handleChange} sx={{width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id={order.id}
                sx={{
                    background: background,
                    paddingLeft: matches_600 ? "16px" : "4px",
                    paddingRight: matches_600 ? "16px" : "4px",
                    margin: 0,
                }}
            >
                <OrdersListItemHeader order={order}/>
            </AccordionSummary>
            <AccordionDetails sx={{padding: "0 0 12px 0"}}>
                {expanded === order.id && (
                    <>
                        <OrderPositionsList
                            isEdit={isEdit}
                            orderId={order.id}
                            orderItems={order.orderItems}
                            isSelectPositionMode={isSelectPositionMode}
                            isLimitedOverview
                        />
                        {!isSelectPositionMode && (
                            <Stack
                                direction={ROW}
                                alignItems={CENTER}
                                spacing={2}
                                justifyContent={SPACE_BETWEEN}
                                sx={{width: "100%", cursor: CURSOR_POINTER}}
                                onClick={handleMoreClick}
                                mt={2}
                                pr={2}
                            >
                                <Stack direction={ROW} spacing={1} alignItems={CENTER}>
                                    <OrderApprovedCheckbox order={order}/>
                                    <Typography>одобрена</Typography>
                                </Stack>
                                <Stack direction={ROW} spacing={1} alignItems={CENTER}>
                                    <Typography color={"primary"}>Подробнее</Typography>
                                    <MoreHorizIcon color={"primary"}/>
                                </Stack>
                            </Stack>
                        )}
                    </>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default OrdersListItem;
