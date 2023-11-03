import React from "react";
import {useAppSelector} from "../hooks/redux";
import {getOrders} from "../store/selectors/orders";
import OrdersListItem from "./OrdersListItem";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import OrdersListHeader from "./OrdersListHeader";

const OrdersList = () => {
    const orders = useAppSelector(state => getOrders(state))
    const ordersList = orders.map(order => (<OrdersListItem key={order.id} order={order}/>))
    return (
        <TableContainer component={Paper} sx={{maxWidth: 1000, mt: 3}}>
            <Table aria-label="simple table">
                <OrdersListHeader/>
                <TableBody>
                    {ordersList ? ordersList : "пока нет заявок"}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersList;