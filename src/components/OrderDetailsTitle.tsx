import React, {FC} from "react";
import {Stack, TextField, Typography} from "@mui/material";
import {NONE} from "../styles/const";
import ApprovedOrderCheckbox from "./ApprovedOrderCheckbox";
import {IOrder} from "../models/iOrders";
import {updateCurrentOrderTitle} from "../store/reducers/orders";
import {useAppDispatch} from "../hooks/redux";

interface IProps {
    currentOrder: IOrder
    isEdit: boolean
    isNewOrder: boolean
}

const OrderDetailsTitle: FC<IProps> = ({currentOrder, isEdit, isNewOrder}) => {
    const dispatch = useAppDispatch();
    const handleTitleChange = (e: any) => {
        dispatch(updateCurrentOrderTitle(e.target.value));
    };
    return (
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
               sx={{maxWidth: 1350, width: "100%"}} spacing={2}>
            {isEdit
                ? (<TextField value={currentOrder.title}
                              name={"title"}
                              onChange={handleTitleChange}
                              margin={NONE}
                              fullWidth
                              label={"Заголовок заявки"}/>)
                : (<Typography fontWeight={600} fontSize={24}>
                    {currentOrder.title}
                </Typography>)}
            {!isNewOrder && (<Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography fontWeight={600}>
                    Одобрена:
                </Typography>
                <ApprovedOrderCheckbox order={currentOrder}/>
            </Stack>)}
        </Stack>
    );
};

export default OrderDetailsTitle;