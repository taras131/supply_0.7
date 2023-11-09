import React, {useEffect, useState} from "react";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    setCurrenOrderIsEdit,
    setCurrentOrder,
} from "../store/reducers/orders";
import {emptyOrder} from "../models/iOrders";
import {
    getCurrentOrder,
    getCurrentOrderIsEdit,
    getOrderById,
    getRelatedInvoicesByOrderID,
} from "../store/selectors/orders";
import OrderPositionsList from "../components/OrderPositionsList";
import {fetchAddOrder, fetchUpdateOrder} from "../store/actionsCreators/orders";
import {getDateInMilliseconds} from "../utils/services";
import OrderDetailsHeader from "../components/OrderDetailsHeader";
import OrderDetailsTypes from "../components/OrderDetailsTypes";
import InvoicesList from "../components/InvoicesList";
import OrderDetailsTitle from "../components/OrderDetailsTitle";

const OrderDetails = () => {
    const [isValidate, setIsValidate] = useState(false);
    const dispatch = useAppDispatch();
    const orderId = useParams().orderId || "0";
    const isNewOrder = orderId === "new_order";
    const matches_700 = useMediaQuery("(min-width:700px)");
    const currentOrder = useAppSelector(state => getCurrentOrder(state));
    const order = useAppSelector(state => getOrderById(state, orderId));
    const isEdit = useAppSelector(state => getCurrentOrderIsEdit(state));
    const relatedInvoices = useAppSelector(state => {
        if (isNewOrder) {
            return null;
        } else {
            return getRelatedInvoicesByOrderID(state, orderId);
        }
    });
    useEffect(() => {
        if (isNewOrder) {
            dispatch(setCurrentOrder(emptyOrder));
            dispatch(setCurrenOrderIsEdit(true));
        } else {
            dispatch(setCurrentOrder(order));
            dispatch(setCurrenOrderIsEdit(false));
        }
    }, [order]);
    useEffect(() => {
        if (currentOrder.title.length > 4 && currentOrder.orderItems[0].name.length > 2) {
            setIsValidate(true);
        } else {
            setIsValidate(false);
        }
    }, [currentOrder]);
    const handleAddClick = () => {
        if (isNewOrder) {
            const {id, ...newOrder} = currentOrder;
            dispatch(fetchAddOrder({...newOrder, author: {userId: "", dateCreating: getDateInMilliseconds()}}));
            dispatch(setCurrentOrder(emptyOrder));
        } else {
            dispatch(fetchUpdateOrder(currentOrder));
            dispatch(setCurrenOrderIsEdit(false));
        }
        setIsValidate(false);
    };

    const toggleIsEdit = () => {
        dispatch(setCurrenOrderIsEdit(!isEdit));
    };
    return (
        <Stack alignItems="center" spacing={matches_700 ? 3 : 2}>
            <OrderDetailsHeader isNewOrder={isNewOrder}
                                isValidate={isValidate}
                                handleAddClick={handleAddClick}
                                isEdit={isEdit}
                                toggleIsEdit={toggleIsEdit}/>
            <OrderDetailsTitle currentOrder={currentOrder}
                               isEdit={isEdit}
                               isNewOrder={isNewOrder}/>
            <OrderDetailsTypes isEdit={isEdit}
                               currentOrder={currentOrder}
                               isNewOrder={isNewOrder}/>
            <Stack alignItems={"center"} sx={{width: "100%"}}>
                <OrderPositionsList orderItems={currentOrder.orderItems}
                                    isEdit={isEdit}
                                    orderId={orderId}
                                    isSelectPositionMode={false}/>
            </Stack>
            {relatedInvoices && relatedInvoices.length > 0 && !isEdit && (
                <Stack sx={{maxWidth: 1350, width: "100%"}} spacing={2}>
                    <Typography fontSize={"20px"} fontWeight={600}>
                        Связанные счета:
                    </Typography>
                    <InvoicesList invoices={relatedInvoices}/>
                </Stack>
            )}
        </Stack>
    );
};

export default OrderDetails;