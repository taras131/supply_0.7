import React, {FC} from "react";
import {IOrderItem} from "../models/iOrders";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import OrderItem from "./OrderItem";
import AddIcon from "@mui/icons-material/Add";
import {useAppDispatch} from "../hooks/redux";
import {addEmptyOrderItem} from "../store/reducers/orders";
import {getDateInMilliseconds} from "../utils/services";

interface IProps {
    orderItems: IOrderItem []
    isEdit: boolean
}

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#272e3d",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const OrderItemList: FC<IProps> = ({orderItems, isEdit}) => {
    const dispatch = useAppDispatch()
    const handleAddClick = () => {
        dispatch(addEmptyOrderItem(getDateInMilliseconds()))
    }
    const orderItemsList = orderItems.map((orderItem, index) => (<OrderItem
        key={orderItem.id}
        index={index}
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
                        <StyledTableCell  alignItems={"center"} >Количество</StyledTableCell>
                        <StyledTableCell>Комментарий</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderItemsList}
                </TableBody>
            </Table>
            <IconButton aria-label="delete" color={"primary"} onClick={handleAddClick}>
                <AddIcon />
            </IconButton>
        </TableContainer>
    );
};

export default OrderItemList;