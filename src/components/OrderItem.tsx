import React, {FC} from "react";
import {IOrderItem} from "../models/iOrders";
import {styled} from "@mui/material/styles";
import {Stack, TableRow, TextField} from "@mui/material";
import {StyledTableCell} from "./OrderItemList";
import {useAppDispatch} from "../hooks/redux";
import {removeOrderItem, updateItemsCount, updateItemsValues} from "../store/reducers/orders";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface IProps {
    orderItem: IOrderItem
    isEdit: boolean
    index: number
}

export const StyledTextField = styled(TextField)(({theme}) => ({
    "& input[type=number]": {
        "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const OrderItem: FC<IProps> = ({orderItem, isEdit, index}) => {
    const dispatch = useAppDispatch()
    const handleInputChange = (e: any) => {
        dispatch(updateItemsValues({
            id: orderItem.id,
            name: e.target.name,
            newValue: e.target.value,
        }))
    }
    const handleCountChange = (e: any) => {
        const value = +e.target.value
        if (value > 0) {
            dispatch(updateItemsCount({id: orderItem.id, newValue: value}))
        }
    }
    const handleMinusClick = () => {
        dispatch(updateItemsCount({id: orderItem.id, newValue: orderItem.count - 1}));
    };
    const handlePlusClick = () => {
        dispatch(updateItemsCount({id: orderItem.id, newValue: orderItem.count + 1}));
    };
    const handleRemoveClick = () => {
        if (orderItem.id !== 0) {
            dispatch(removeOrderItem(orderItem.id))
        }
    }
    return (
        <StyledTableRow>
            <StyledTableCell component="th" scope="row" sx={{paddingTop: 0, paddingBottom: 0}}>
                {index + 1}
            </StyledTableCell>
            <StyledTableCell sx={{paddingTop: 1, paddingBottom: 1}}>
                {isEdit
                    ? (<TextField name={"name"}
                                  value={orderItem.name}
                                  variant="standard"
                                  onChange={handleInputChange}/>)
                    : orderItem.name}
            </StyledTableCell>
            <StyledTableCell sx={{paddingTop: 1, paddingBottom: 1}}>
                {isEdit
                    ? (<TextField name={"catalogNumber"}
                                  value={orderItem.catalogNumber}
                                  variant="standard"
                                  onChange={handleInputChange}/>)
                    : orderItem.catalogNumber}
            </StyledTableCell>
            <StyledTableCell sx={{paddingTop: 1, paddingBottom: 1}}>
                {isEdit
                    ? (<Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <IconButton aria-label="delete"
                                    onClick={handleMinusClick}
                                    disabled={orderItem.count < 2}>
                            <RemoveIcon/>
                        </IconButton>
                        <StyledTextField name={"count"}
                                         value={orderItem.count}
                                         inputProps={{style: {textAlign: "center"}}}
                                         type={"number"}
                                         variant="standard"
                                         sx={{width: "60px"}}
                                         onChange={handleCountChange}
                        />
                        <IconButton aria-label="delete" onClick={handlePlusClick}>
                            <AddIcon/>
                        </IconButton>
                    </Stack>)
                    : orderItem.count}
            </StyledTableCell>
            <StyledTableCell sx={{paddingTop: 1, paddingBottom: 1}}>
                {isEdit
                    ? (<TextField name={"comment"}
                                  value={orderItem.comment}
                                  variant="standard"
                                  onChange={handleInputChange}/>)
                    : orderItem.comment}
            </StyledTableCell>
            {isEdit && (
                <StyledTableCell sx={{paddingTop: 1, paddingBottom: 1}}>
                    <IconButton aria-label="delete"
                                onClick={handleRemoveClick}
                                disabled={orderItem.id === 0}>
                        <DeleteIcon/>
                    </IconButton>
                </StyledTableCell>
            )}
        </StyledTableRow>
    );
};

export default OrderItem;