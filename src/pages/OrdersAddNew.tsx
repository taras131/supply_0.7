import React, {useEffect, useId, useState} from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField} from "@mui/material";
import PageHeaderWithBackButton from "../components/PageHeaderWithBackButton";
import {routes} from "../utils/routes";
import useFormWithValidation from "../hooks/useFormWithValidation";
import {ordersTypes, shipmentTypes} from "../utils/const";
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setCurrenOrderIsEdit, setCurrentOrder} from "../store/reducers/orders";
import {emptyOrder} from "../models/iOrders";
import {getCurrentOrder, getCurrentOrderIsEdit} from "../store/selectors/orders";
import OrderItemList from "../components/OrderItemList";


const OrdersAddNew = () => {
    const [isValidate, setIsValidate] = useState(false);
    const shipmentTypeRadioId = useId();
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();
    const currentOrder = useAppSelector(state => getCurrentOrder(state));
    const isEdit = useAppSelector(state => getCurrentOrderIsEdit(state));
    const [radioState, setRadioState] = useState({
        shipmentTypes: currentOrder.shipmentType,
        ordersTypes: currentOrder.orderType,
    });
    useEffect(() => {
        if (pathname === routes.addNewOrders) {
            dispatch(setCurrentOrder(emptyOrder));
            dispatch(setCurrenOrderIsEdit(true));
        } else {
            dispatch(setCurrenOrderIsEdit(false));
        }
    }, []);
    const {handleChange, isValid, errors, values, setValues, setIsValid} =
        useFormWithValidation();
    const handleAddClick = () => {
        setIsValidate(false);
    };
    const handleFormSubmit = () => {
        console.log(values);
    };
    const handleChangeRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioState({...radioState, [e.target.name]: e.target.value});
    };
    return (
        <Stack alignItems="center" spacing={4} pt={3}>
            <PageHeaderWithBackButton title={"Новая заявка"}
                                      isValidate={isValidate}
                                      handleAddClick={handleAddClick}
                                      backRoute={routes.orders}/>
            <form
                name="accountData"
                onSubmit={handleFormSubmit}
            >
                <TextField value={values.title || ""}
                           name={"title"}
                           onChange={handleChange}
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
                        value={radioState.shipmentTypes}
                        onChange={handleChangeRadioChange}
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
                        value={radioState.ordersTypes}
                        onChange={handleChangeRadioChange}
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

export default OrdersAddNew;