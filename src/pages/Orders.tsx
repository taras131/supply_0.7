import React from "react";
import {Stack} from "@mui/material";
import OrdersList from "../components/OrdersList";
import PageHeader from "../components/PageHeader";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getOrders} from "../store/selectors/orders";

const Orders = () => {
    const orders = useAppSelector(state => getOrders(state, false));
    return (
        <Stack alignItems="center" spacing={4} pt={3}>
            <PageHeader title={"Заявки:"} route={`${routes.orders}/new_order`} buttonText={"Заявка"}/>
            <OrdersList orders={orders}/>
        </Stack>
    );
};

export default Orders;