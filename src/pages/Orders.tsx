import React from "react";
import {Stack} from "@mui/material";
import OrdersList from "../components/OrdersList";
import PageHeader from "../components/PageHeader";
import {routes} from "../utils/routes";

const Orders = () => {
    return (
        <Stack alignItems="center" spacing={4} pt={3}>
            <PageHeader title={"Заявки:"} route={routes.addNewOrders} buttonText={"Заявка"}/>
            <OrdersList/>
        </Stack>
    );
};

export default Orders;