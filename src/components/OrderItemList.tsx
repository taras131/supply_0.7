import React, {FC} from "react";
import {IOrderItem} from "../models/iOrders";
import {Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from "@mui/material";
import {styled} from "@mui/material/styles";
import OrderItem from "./OrderItem";

interface IProps {
    orderItems: IOrderItem []
    isEdit: boolean
}

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const OrderItemList: FC<IProps> = ({orderItems, isEdit}) => {
    const orderItemsList = orderItems.map(orderItem => (<OrderItem
        key={orderItem.id}
        orderItem={orderItem}
        isEdit={isEdit}/>));
    return (
        <TableContainer sx={{maxWidth: "1000px", width: "100%"}}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>№</StyledTableCell>
                        <StyledTableCell>Наименование</StyledTableCell>
                        <StyledTableCell>Каталожный номер</StyledTableCell>
                        <StyledTableCell>Количество</StyledTableCell>
                        <StyledTableCell>Комментарий</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderItemsList}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderItemList;