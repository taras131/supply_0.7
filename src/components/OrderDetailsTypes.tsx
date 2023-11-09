import React, {FC, useId} from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack} from "@mui/material";
import {ordersTypes, shipmentTypes} from "../utils/const";
import NameWithValue from "./NameWithValue";
import {IOrder, TOrdersType} from "../models/iOrders";
import {updateCurrentOrderShipmentType, updateCurrentOrderType} from "../store/reducers/orders";
import {TShipmentsType} from "../models/iShipments";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {CENTER, SPACE_BETWEEN} from "../styles/const";
import {getUserFullNameById} from "../store/selectors/auth";

interface IProps {
    isEdit: boolean
    currentOrder: IOrder
    isNewOrder: boolean
}

const OrderDetailsTypes:FC<IProps> = ({isEdit,currentOrder, isNewOrder}) => {
    const shipmentTypeRadioId = useId();
    const orderTypeRadioId = useId();
    const dispatch = useAppDispatch();
    const authorFullName = useAppSelector(state => getUserFullNameById(state, currentOrder.author.userId));
    const handleShipmentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderShipmentType(e.target.value as TShipmentsType));
    };
    const handleOrdersTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderType(e.target.value as TOrdersType));
    };
    return (
        <Stack direction={"row"} spacing={1} sx={{maxWidth: 1350, width: "100%"}}
               justifyContent={SPACE_BETWEEN} alignItems={CENTER}>
            {isEdit
                ? (<>
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
                        <FormLabel id={orderTypeRadioId}>Тип заявки:</FormLabel>
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
                </>)
                : (<>
                    <NameWithValue title={"Срочность:"}>
                        {currentOrder.shipmentType === "railway" ? "ЖД" : "Авиа"}
                    </NameWithValue>
                    <NameWithValue title={"Тип заявки:"}>
                        {currentOrder.orderType === "current" ? "Текущая" : "Годовая"}
                    </NameWithValue>
                    {!isNewOrder && authorFullName && (
                        <NameWithValue title={"Автор:"}>
                            {authorFullName}
                        </NameWithValue>
                    )}
                </>)}

        </Stack>
    );
};

export default OrderDetailsTypes;