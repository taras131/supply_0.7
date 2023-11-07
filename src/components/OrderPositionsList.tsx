import React, {FC} from "react";
import {IOrderItem} from "../models/iOrders";
import OrderItem from "./OrderItem";
import {Table, TableBody, TableHead, TableRow} from "@mui/material";
import {StyledTableCell} from "./OrderItemList";

interface IProps {
    orderId: string
    positions: IOrderItem []
    isSelectPositionMode: boolean
}

const OrderPositionsList: FC<IProps> = ({positions, isSelectPositionMode, orderId}) => {

    const orderPositionsList = positions.map((position, index) => (<OrderItem key={position.id}
                                                                              orderItem={position}
                                                                              isEdit={false}
                                                                              index={index}
                                                                              orderId={orderId}
                                                                              isSelectPositionMode={isSelectPositionMode}/>));

    return (
        <Table aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell>№</StyledTableCell>
                    <StyledTableCell>Наименование</StyledTableCell>
                    <StyledTableCell>Каталожный номер</StyledTableCell>
                    <StyledTableCell>Количество</StyledTableCell>
                    <StyledTableCell>Комментарий</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orderPositionsList}
            </TableBody>
        </Table>
    );
};

export default OrderPositionsList;