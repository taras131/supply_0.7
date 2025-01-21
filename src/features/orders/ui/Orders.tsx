import React, {useState} from "react";
import OrdersList from "features/orders/ui/OrdersList";
import PageHeaderWithTitleAndButton from "components/PageHeaderWithTitleAndButton";
import {routes} from "utils/routes";
import {useAppSelector} from "hooks/redux";
import OrdersHelper from "features/orders/ui/OrdersHelper";
import PageLayout from "components/PageLayout";
import {getOrders} from "features/orders/model/selectors";
import OrdersFilter from "features/orders/ui/OrdersFilter";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Orders = () => {
    const [isShowCancelled, setIsShowCancelled] = useState(false);
    const orders = useAppSelector(state => getOrders(state,false, isShowCancelled));

    const handleIsShowCancelledChange = () => {
        setIsShowCancelled(prev => !prev);
    };
    return (
        <PageLayout>
            <PageHeaderWithTitleAndButton title={"Заявки:"} route={`${routes.orders}/new_order`} buttonText={"Заявка"}/>
            <OrdersFilter/>
            <FormControlLabel control={<Switch checked={isShowCancelled}
                                               onChange={handleIsShowCancelledChange}
                                               inputProps={{"aria-label": "controlled"}}/>}
                              label="Показать отменённые"/>
            <OrdersList orders={orders}/>
            <OrdersHelper/>
        </PageLayout>
    );
};

export default Orders;
