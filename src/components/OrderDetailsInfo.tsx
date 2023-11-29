import React, {FC, useId} from "react";
import {
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel, MenuItem,
    Radio,
    RadioGroup, Select,
    Stack,
    useMediaQuery,
} from "@mui/material";
import {ordersTypes, shipmentTypes} from "../utils/const";
import NameWithValue from "./NameWithValue";
import {IOrder, TOrdersType} from "../models/iOrders";
import {
    updateCurrentOrderMachineryId,
    updateCurrentOrderShipmentType,
    updateCurrentOrderType,
} from "../store/reducers/orders";
import {TShipmentsType} from "../models/iShipments";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {COLUMN, ROW, SPACE_BETWEEN, START} from "../styles/const";
import {getMachinery} from "../store/selectors/machinery";

interface IProps {
    isEdit: boolean
    currentOrder: IOrder
    isNewOrder: boolean
}

const OrderDetailsInfo: FC<IProps> = ({isEdit, currentOrder, isNewOrder}) => {
    const dispatch = useAppDispatch();
    const shipmentTypeRadioId = useId();
    const orderTypeRadioId = useId();
    const selectMachineryId = useId();
    const matches_850 = useMediaQuery("(min-width:850px)");
    const matches_700 = useMediaQuery("(min-width:700px)");
    const machinery = useAppSelector(state => getMachinery(state));
    const machineryMenuList = machinery.map(machinery => (<MenuItem key={machinery.id}
                                                                    value={machinery.id}>
        {`${machinery.brand} ${machinery.model} ${machinery.vin} ${machinery.yearManufacture}`}
    </MenuItem>))
    const handleShipmentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderShipmentType(e.target.value as TShipmentsType));
    };
    const handleOrdersTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderType(e.target.value as TOrdersType));
    };
    const handleMachineryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCurrentOrderMachineryId(e.target.value as string))
    }
    return (
        <Stack sx={{width: "100%"}}
               spacing={matches_850 ? 2 : 1}
               direction={matches_700 ? ROW : COLUMN}
               justifyContent={matches_700 ? SPACE_BETWEEN : START}>
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
                    <FormControl sx={{width: "250px"}}>
                        <Select
                            id={selectMachineryId}
                            defaultValue={""}
                            value={currentOrder.machineryId}
                            onChange={handleMachineryChange}
                            sx={{overflow: "hidden"}}
                        >
                            {machineryMenuList}
                        </Select>
                        <FormHelperText>Прикрепить технику</FormHelperText>
                    </FormControl>
                </>)
                : (<>
                    <NameWithValue width={"130px"} title={"Срочность:"}>
                        {currentOrder.shipmentType === "railway" ? "ЖД" : "Авиа"}
                    </NameWithValue>
                    <NameWithValue width={"170px"} title={"Тип заявки:"}>
                        {currentOrder.orderType === "current" ? "Текущая" : "Годовая"}
                    </NameWithValue>
                </>)}
        </Stack>
    );
};

export default OrderDetailsInfo;