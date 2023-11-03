import React, {FC} from "react";
import {IOrder} from "../models/iOrders";
import {Chip, IconButton, Stack, TableCell, TableRow, Typography} from "@mui/material";
import {convertMillisecondsToDate} from "../utils/services";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppSelector} from "../hooks/redux";
import {getUserFullNameById} from "../store/selectors/auth";

interface IProps {
    order: IOrder
}

const OrdersListItem: FC<IProps> = ({order}) => {
    const navigate = useNavigate()
    const authorFullName = useAppSelector(state => getUserFullNameById(state, order.author.userId)) || ""
    const handleMoreClick = () => {
        navigate(`${routes.orders}/${order.id}`);
    }
    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": {border: 0},
                backgroundColor: "white",
            }}
        >
            <TableCell align={"center"}>

            </TableCell>

            <TableCell sx={{color: "black"}}>{convertMillisecondsToDate(order.author.dateCreating) || ""}</TableCell>
            <TableCell sx={{color: "black"}}>{order.title}</TableCell>
            <TableCell sx={{cursor: "pointer"}}>
                <Typography sx={{color: "black"}}>
                    {authorFullName}
                </Typography>
            </TableCell>
            <TableCell align={"center"}>
                <Typography sx={{color: "black"}}>
                    {order.orderItems.length}
                </Typography>
            </TableCell>
            <TableCell sx={{color: "black"}} align={"center"}>
                {""}
            </TableCell>
            <TableCell align={"center"}>
                <IconButton aria-label="add to shopping cart" onClick={handleMoreClick}>
                    <MoreVertIcon color="success"/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default OrdersListItem;