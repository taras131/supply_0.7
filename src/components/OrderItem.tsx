import React, {FC, useId} from "react";
import {IOrderItem} from "../models/iOrders";
import {styled} from "@mui/material/styles";
import {Checkbox, Stack, TableRow, TextField} from "@mui/material";
import {StyledTableCell} from "./OrderItemList";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {removeOrderItem, updateItemsCount, updateItemsValues} from "../store/reducers/orders";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {setSelectedOrderPosition} from "../store/reducers/invoices";
import {getIsPositionSelected} from "../store/selectors/invoices";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";

interface IProps {
    orderItem: IOrderItem
    isEdit: boolean
    index: number
    orderId: string
    isSelectPositionMode: boolean
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

const OrderItem: FC<IProps> = ({orderItem, isEdit, index, isSelectPositionMode, orderId}) => {
    const positionCheckBoxId = useId();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isPositionSelected = useAppSelector(state => getIsPositionSelected(state, orderId, orderItem.id));
    const handleSelectPosition = () => {
        dispatch(setSelectedOrderPosition({orderId: orderId, positionId: orderItem.id}));
    };
    const handleInvoiceClick = () => {
        if (orderItem.invoiceId) {
            navigate(`${routes.invoices}/${orderItem.invoiceId}`, {state: {from: routes.orders}});
        }
    };
    const handleInputChange = (e: any) => {
        dispatch(updateItemsValues({
            id: orderItem.id,
            name: e.target.name,
            newValue: e.target.value,
        }));
    };
    const handleCountChange = (e: any) => {
        const value = +e.target.value;
        if (value > 0) {
            dispatch(updateItemsCount({id: orderItem.id, newValue: value}));
        }
    };
    const handleMinusClick = () => {
        dispatch(updateItemsCount({id: orderItem.id, newValue: orderItem.count - 1}));
    };
    const handlePlusClick = () => {
        dispatch(updateItemsCount({id: orderItem.id, newValue: orderItem.count + 1}));
    };
    const handleRemoveClick = () => {
        if (orderItem.id !== 0) {
            dispatch(removeOrderItem(orderItem.id));
        }
    };
    return (
        <StyledTableRow sx={{width: "100%"}}>
            <StyledTableCell component="th" scope="row" sx={{paddingTop: 1, paddingBottom: 1}}>
                {index + 1}
            </StyledTableCell>
            <StyledTableCell>
                {isEdit
                    ? (<TextField name={"name"}
                                  value={orderItem.name}
                                  variant="standard"
                                  onChange={handleInputChange}/>)
                    : orderItem.name}
            </StyledTableCell>
            <StyledTableCell>
                {isEdit
                    ? (<TextField name={"catalogNumber"}
                                  value={orderItem.catalogNumber}
                                  variant="standard"
                                  onChange={handleInputChange}/>)
                    : orderItem.catalogNumber}
            </StyledTableCell>
            <StyledTableCell>
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
            <StyledTableCell>
                {isEdit
                    ? (<TextField name={"comment"}
                                  value={orderItem.comment}
                                  variant="standard"
                                  onChange={handleInputChange}/>)
                    : orderItem.comment}
            </StyledTableCell>
            <StyledTableCell>
                {isEdit && (

                    <IconButton aria-label="delete"
                                onClick={handleRemoveClick}
                                disabled={orderItem.id === 0}>
                        <DeleteIcon/>
                    </IconButton>

                )}
                {isSelectPositionMode && (
                    <Checkbox
                        id={positionCheckBoxId}
                        checked={isPositionSelected}
                        onChange={handleSelectPosition}
                        inputProps={{"aria-label": "controlled"}}
                    />
                )}
                {!isEdit && !isSelectPositionMode && orderItem.invoiceId && (
                    <Button variant={"contained"} size={"small"} onClick={handleInvoiceClick}>
                        Счёт
                    </Button>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default OrderItem;