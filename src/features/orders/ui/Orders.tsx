import React from "react";
import OrdersList from "features/orders/ui/OrdersList";
import PageHeaderWithTitleAndButton from "components/PageHeaderWithTitleAndButton";
import {routes} from "utils/routes";
import {useAppSelector} from "hooks/redux";
import OrdersHelper from "features/orders/ui/OrdersHelper";
import PageLayout from "components/PageLayout";
import {getOrders} from "features/orders/model/selectors";
import OrdersFilter from "features/orders/ui/OrdersFilter";

const Orders = () => {
    const orders = useAppSelector(getOrders);
    return (
        <PageLayout>
            <PageHeaderWithTitleAndButton title={"Заявки:"} route={`${routes.orders}/new_order`} buttonText={"Заявка"}/>
            <OrdersFilter/>
            <OrdersList orders={orders}/>
            <OrdersHelper/>
        </PageLayout>
    );
};

export default Orders;
