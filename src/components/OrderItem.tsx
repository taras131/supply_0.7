import React, {FC} from "react";
import {IOrderItem} from "../models/iOrders";
import {styled} from "@mui/material/styles";
import {TableRow, TextField} from "@mui/material";
import {StyledTableCell} from "./OrderItemList";

interface IProps {
    orderItem: IOrderItem
    isEdit: boolean
}

const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const OrderItem: FC<IProps> = ({orderItem, isEdit}) => {
    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row">
                {orderItem.id + 1}
            </StyledTableCell>
            <StyledTableCell>
                {isEdit
                    ? (<TextField value={orderItem.name} variant="filled"/>)
                    : orderItem.name}
            </StyledTableCell>
            <StyledTableCell>
                {isEdit
                    ? (<TextField value={orderItem.catalogNumber} variant="filled"/>)
                    : orderItem.catalogNumber}
            </StyledTableCell>
            <StyledTableCell>
                {isEdit
                    ? (<TextField value={orderItem.count} variant="filled"/>)
                    : orderItem.count}
            </StyledTableCell>
            <StyledTableCell>
                {isEdit
                    ? (<TextField value={orderItem.comment} variant="filled"/>)
                    : orderItem.comment}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default OrderItem;