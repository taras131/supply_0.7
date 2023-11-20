import React, {FC, useId} from "react";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {ordersTypes, shipmentTypes} from "../utils/const";
import NameWithValue from "./NameWithValue";
import {IOrder, TOrdersType} from "../models/iOrders";
import {
    updateCurrentOrderShipmentType,
    updateCurrentOrderType,
} from "../store/reducers/orders";
import {TShipmentsType} from "../models/iShipments";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {CENTER, ROW, SPACE_AROUND, SPACE_BETWEEN} from "../styles/const";
import {getUserFullNameById} from "../store/selectors/auth";
import ApprovedOrderCheckbox from "./ApprovedOrderCheckbox";
import Grid from "@mui/material/Unstable_Grid2";

interface IProps {
    isEdit: boolean
    currentOrder: IOrder
    isNewOrder: boolean
}

const OrderDetailsInfo: FC<IProps> = ({isEdit, currentOrder, isNewOrder}) => {
    const dispatch = useAppDispatch();
    const shipmentTypeRadioId = useId();
    const orderTypeRadioId = useId();
    const matches_850 = useMediaQuery("(min-width:850px)");
    const authorFullName = useAppSelector(state => getUserFullNameById(state, currentOrder.author.userId));
    const handleShipmentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderShipmentType(e.target.value as TShipmentsType));
    };
    const handleOrdersTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderType(e.target.value as TOrdersType));
    };
    return (
        <Grid container sx={{width: "100%"}} spacing={matches_850 ? 2 : 1} alignItems={CENTER}>
            {isEdit
                ? (<Grid xs={matches_850 && !isNewOrder ? 6 : 12}>
                    <Stack direction={ROW} alignItems={CENTER}
                           justifyContent={matches_850 && !isNewOrder ? SPACE_AROUND : SPACE_BETWEEN}>
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
                    </Stack>
                </Grid>)
                : (<Grid xs={matches_850 ? 6 : 12}>
                    <Stack direction={ROW} alignItems={CENTER}
                           justifyContent={matches_850 ? SPACE_AROUND : SPACE_BETWEEN}>
                        <NameWithValue width={"130px"} title={"Срочность:"}>
                            {currentOrder.shipmentType === "railway" ? "ЖД" : "Авиа"}
                        </NameWithValue>

                        <NameWithValue width={"170px"} title={"Тип заявки:"}>
                            {currentOrder.orderType === "current" ? "Текущая" : "Годовая"}
                        </NameWithValue>
                    </Stack>
                </Grid>)}
            {!isNewOrder && (
                <Grid xs={matches_850 ? 6 : 12}>
                    <Stack direction={ROW} alignItems={CENTER}
                           justifyContent={matches_850 ? SPACE_AROUND : SPACE_BETWEEN}>

                        <NameWithValue width={"200px"} title={"Автор:"}>
                            {authorFullName ? authorFullName : "неизвестен"}
                        </NameWithValue>
                        <Stack direction={matches_850 ? ROW : "row-reverse"} alignItems={CENTER} spacing={1}>
                            <Typography fontWeight={600}>
                                Одобрена
                            </Typography>
                            <ApprovedOrderCheckbox order={currentOrder}/>
                        </Stack>
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};

export default OrderDetailsInfo;