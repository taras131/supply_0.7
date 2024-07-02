import React from "react";
import OrdersList from "../components/OrdersList";
import PageHeaderWithTitleAndButton from "../components/PageHeaderWithTitleAndButton";
import { routes } from "utils/routes";
import { useAppSelector } from "hooks/redux";
import { getOrders } from "store/selectors/orders";
import OrdersHelper from "components/OrdersHelper";
import PageLayout from "components/PageLayout";

const Orders = () => {
  const orders = useAppSelector((state) => getOrders(state, false));
  return (
    <PageLayout>
      <PageHeaderWithTitleAndButton title={"Заявки:"} route={`${routes.orders}/new_order`} buttonText={"Заявка"} />
      <OrdersList orders={orders} />
      <OrdersHelper />
    </PageLayout>
  );
};

export default Orders;
