import React, { FC } from "react";
import OrdersListItem from "features/orders/ui/OrdersListItem";
import { IOrder } from "models/iOrders";
import { Stack } from "@mui/material";

interface IProps {
  isSelectPositionMode?: boolean;
  orders: IOrder[];
}

const OrdersList: FC<IProps> = ({ orders, isSelectPositionMode = false }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const ordersList = orders.map((order) => (
    <OrdersListItem
      key={order.id}
      order={order}
      handleChange={handleChange(order.id)}
      expanded={expanded}
      isSelectPositionMode={isSelectPositionMode}
    />
  ));
  return <Stack sx={{ width: "100%" }}>{ordersList}</Stack>;
};

export default OrdersList;
