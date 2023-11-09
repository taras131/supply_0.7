import React from "react";
import {Stack, useMediaQuery} from "@mui/material";
import OrdersList from "../components/OrdersList";
import PageHeader from "../components/PageHeader";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getOrders} from "../store/selectors/orders";
import OrdersHelper from "../components/OrdersHelper";

const Orders = () => {
    const orders = useAppSelector(state => getOrders(state, false));
    const matches_700 = useMediaQuery("(min-width:700px)");
    return (
        <Stack alignItems="center" spacing={matches_700 ? 4 : 3} pt={matches_700 ? 2 : 1}>
            <PageHeader title={"Заявки:"}
                        route={`${routes.orders}/new_order`}
                        buttonText={"Заявка"}/>
            <OrdersList orders={orders}/>
            <OrdersHelper/>
        </Stack>
    );
};

export default Orders;