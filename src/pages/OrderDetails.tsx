import React, {useEffect, useState} from "react";
import {Stack, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    setCurrenOrderIsEdit,
    setCurrentOrder,
    updateCurrentOrderTitle,
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
import ApprovedOrderCheckbox from "../components/ApprovedOrderCheckbox";
import OrderDetailsHeader from "../components/OrderDetailsHeader";
import OrderDetailsTypes from "../components/OrderDetailsTypes";
import InvoicesList from "../components/InvoicesList";
import Box from "@mui/material/Box";

const OrderDetails = () => {
    const [isValidate, setIsValidate] = useState(false);
    const dispatch = useAppDispatch();
    const orderId = useParams().orderId || "0";
    const currentOrder = useAppSelector(state => getCurrentOrder(state));
    const order = useAppSelector(state => getOrderById(state, orderId));
    const isEdit = useAppSelector(state => getCurrentOrderIsEdit(state));
    const relatedInvoices = useAppSelector(state => getRelatedInvoicesByOrderID(state, orderId));
    const isNewOrder = orderId === "new_order";
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
    const handleTitleChange = (e: any) => {
        dispatch(updateCurrentOrderTitle(e.target.value));
    };
    const toggleIsEdit = () => {
        dispatch(setCurrenOrderIsEdit(!isEdit));
    };
    return (
        <Stack alignItems="center" spacing={4} pt={3} pb={6}>
            <OrderDetailsHeader isNewOrder={isNewOrder}
                                isValidate={isValidate}
                                handleAddClick={handleAddClick}
                                isEdit={isEdit}
                                toggleIsEdit={toggleIsEdit}/>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                   sx={{maxWidth: 1350, width: "100%"}}>
                {isEdit
                    ? (<TextField value={currentOrder.title}
                                  name={"title"}
                                  onChange={handleTitleChange}
                                  label={"Заголовок заявки"}/>)
                    : (<Typography fontWeight={600} fontSize={24}>
                        {currentOrder.title}
                    </Typography>)}
                {!isNewOrder && (<Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography fontWeight={600}>
                        Одобрена:
                    </Typography>
                    <ApprovedOrderCheckbox order={order}/>
                </Stack>)}
            </Stack>
            <OrderDetailsTypes isEdit={isEdit} currentOrder={currentOrder}/>
            <Stack alignItems={"center"} sx={{width: "100%"}}>
                <OrderPositionsList orderItems={currentOrder.orderItems}
                                    isEdit={isEdit}
                                    orderId={orderId}
                                    isSelectPositionMode={false}/>
            </Stack>
            {relatedInvoices && !isEdit && (
                <Box sx={{width: 1350}}>
                    <Typography fontSize={"20px"} fontWeight={600}>
                        Связанные счета:
                    </Typography>
                    <InvoicesList invoices={relatedInvoices}/>
                </Box>
            )}
        </Stack>
    );
};

export default OrderDetails;