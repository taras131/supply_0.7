import React, {FC} from "react";
import {useAppSelector} from "../hooks/redux";
import {getOrders} from "../store/selectors/orders";
import OrdersListItem from "./OrdersListItem";

interface IProps {
    isSelectPositionMode?: boolean
}

const OrdersList: FC<IProps> = ({isSelectPositionMode = false}) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const orders = useAppSelector(state => getOrders(state, isSelectPositionMode));
    const ordersList = orders.map(order => (<OrdersListItem key={order.id}
                                                            order={order}
                                                            handleChange={handleChange(order.id)}
                                                            expanded={expanded}
                                                            isSelectPositionMode={isSelectPositionMode}/>));
    return (
        <div style={{maxWidth: "1000px", width: "100%"}}>
            {ordersList}
        </div>
    );
};

export default OrdersList;