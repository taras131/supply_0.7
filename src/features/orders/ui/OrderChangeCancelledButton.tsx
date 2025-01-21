import React, {FC} from "react";
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {fetchUpdateOrder} from "features/orders/model/actions";
import {IOrder} from "models/iOrders";
import {getIsAuth} from "features/auth/model/selectors";

interface IProps {
    currentOrder: IOrder
}

const OrderChangeCancelledButton: FC<IProps> = ({currentOrder}) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getIsAuth);
    const handleChangeCancelledClick = () => {
        console.log("update");
        dispatch(fetchUpdateOrder({
            ...currentOrder, isCancelled: currentOrder && currentOrder.isCancelled
                ? !currentOrder.isCancelled
                : true,
        }));
    };
    return (
        <Button onClick={handleChangeCancelledClick} color="error" disabled={!isAuth}>
            {currentOrder && currentOrder.isCancelled ? "Востановить" : "Отменить"}
        </Button>
    );
};

export default OrderChangeCancelledButton;