import React, {useEffect, useId, useState} from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField} from "@mui/material";
import PageHeaderWithBackButton from "../components/PageHeaderWithBackButton";
import {routes} from "../utils/routes";
import useFormWithValidation from "../hooks/useFormWithValidation";
import {ordersTypes, shipmentTypes} from "../utils/const";
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {
    setCurrenOrderIsEdit,
    setCurrentOrder,
    updateCurrentOrderShipmentType,
    updateCurrentOrderTitle, updateCurrentOrderType,
} from "../store/reducers/orders";
import {emptyOrder, TOrdersType} from "../models/iOrders";
import {getCurrentOrder, getCurrentOrderIsEdit, getOrderById} from "../store/selectors/orders";
import OrderItemList from "../components/OrderItemList";
import {TShipmentsType} from "../models/iShipments";
import {fetchAddOrder} from "../store/actionsCreators/orders";
import {getDateInMilliseconds} from "../utils/services";


const Order = () => {
    const [isValidate, setIsValidate] = useState(false);
    const shipmentTypeRadioId = useId();
    const dispatch = useAppDispatch();
    const orderId = useParams().orderId || "0";
    const currentOrder = useAppSelector(state => getCurrentOrder(state));
    const order = useAppSelector(state => getOrderById(state, orderId));
    const isEdit = useAppSelector(state => getCurrentOrderIsEdit(state));
    const isNewOrder = orderId === "new_order"
    useEffect(() => {
        if (isNewOrder) {
            dispatch(setCurrentOrder(emptyOrder));
            dispatch(setCurrenOrderIsEdit(true));
        } else {
            dispatch(setCurrentOrder(order));
            dispatch(setCurrenOrderIsEdit(false));
        }
    }, []);
    useEffect(() => {
        if (currentOrder.title.length > 4 && currentOrder.orderItems[0].name.length > 2) {
            setIsValidate(true);
        } else {
            setIsValidate(false);
        }
        console.log(isValidate)
    }, [currentOrder.title, currentOrder.orderItems[0].name])

    const handleAddClick = () => {
        if (isNewOrder) {
            const {id, ...newOrder} = currentOrder
            dispatch(fetchAddOrder({...newOrder, author: {userId: "", dateCreating: getDateInMilliseconds()}}))
            dispatch(setCurrentOrder(emptyOrder));
        } else {

        }
        setIsValidate(false);
    };
    const handleTitleChange = (e: any) => {
        dispatch(updateCurrentOrderTitle(e.target.value))
    };
    const handleShipmentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderShipmentType(e.target.value as TShipmentsType))
    };
    const handleOrdersTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderType(e.target.value as TOrdersType))
    };
    return (
        <Stack alignItems="center" spacing={4} pt={3}>
            <PageHeaderWithBackButton title={"Новая заявка"}
                                      isValidate={isValidate}
                                      handleAddClick={handleAddClick}
                                      backRoute={routes.orders}/>
            <form
                name="orderData"
            >
                <TextField value={currentOrder.title}
                           name={"title"}
                           onChange={handleTitleChange}
                           label={"Заголовок заявки"}/>
            </form>
            <Stack direction={"row"} spacing={2} sx={{maxWidth: "1000px", width: "100%"}} alignItems={"center"}
                   justifyContent={"space-between"}>
                <FormControl>
                    <FormLabel id={shipmentTypeRadioId}>Срочность:</FormLabel>
                    <RadioGroup
                        name={"shipmentTypes"}
                        row
                        aria-labelledby={shipmentTypeRadioId}
                        value={currentOrder.shipmentType}
                        onChange={handleShipmentTypeChange}
                    >
                        <FormControlLabel value={shipmentTypes[0].name} control={<Radio/>}
                                          label={shipmentTypes[0].value}/>
                        <FormControlLabel value={shipmentTypes[1].name} control={<Radio/>}
                                          label={shipmentTypes[1].value}/>
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel id={shipmentTypeRadioId}>Тип заявки:</FormLabel>
                    <RadioGroup
                        row
                        name={"ordersTypes"}
                        aria-labelledby={shipmentTypeRadioId}
                        value={currentOrder.orderType}
                        onChange={handleOrdersTypeChange}
                    >
                        <FormControlLabel value={ordersTypes[1].name}
                                          control={<Radio/>}
                                          label={ordersTypes[1].value}/>
                        <FormControlLabel value={ordersTypes[0].name}
                                          control={<Radio/>}
                                          label={ordersTypes[0].value}/>
                    </RadioGroup>
                </FormControl>
            </Stack>
            <Stack alignItems={"center"} sx={{width: "100%"}}>
                <OrderItemList orderItems={currentOrder.orderItems} isEdit={isEdit}/>
            </Stack>
        </Stack>
    );
};

export default Order;