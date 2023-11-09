import React, {FC, useId} from "react";
import {IOrderItem} from "../models/iOrders";
import {Checkbox, Chip, Stack, TextField, useMediaQuery} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {removeOrderItem, updateItemsCount, updateItemsValues} from "../store/reducers/orders";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {setSelectedOrderPosition} from "../store/reducers/invoices";
import {getIsPositionSelected, getSupplierNameByInvoiceId} from "../store/selectors/invoices";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {CENTER, PRIMARY, ROW, StyledTableCell, StyledTableRow, StyledTextField} from "../styles/const";
import {extractAllText} from "../utils/services";
import ReceiptIcon from "@mui/icons-material/Receipt";

interface IProps {
    index: number
    isEdit: boolean
    isLimitedOverview: boolean
    isSelectPositionMode: boolean
    orderId: string
    orderItem: IOrderItem
}

const OrderPositionsListItem: FC<IProps> = ({
                                                orderItem,
                                                isEdit,
                                                index,
                                                isSelectPositionMode,
                                                orderId,
                                                isLimitedOverview,
                                            }) => {
    const positionCheckBoxId = useId();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const matches_700 = useMediaQuery("(min-width:700px)");
    const matches_500 = useMediaQuery("(min-width:500px)");
    const isPositionSelected = useAppSelector(state => getIsPositionSelected(state, orderId, orderItem.id));
    const supplierName = useAppSelector(state => {
        if (orderItem.invoiceId && orderItem.invoiceId.length && orderItem.invoiceId.length > 4) {
            return getSupplierNameByInvoiceId(state, orderItem.invoiceId);
        } else {
            return "";
        }
    });
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
            <StyledTableCell component="th" scope="row"
                             sx={{padding: matches_700 ? "8px" : "2px"}}
                             align={CENTER}>
                {index + 1}
            </StyledTableCell>
            <StyledTableCell sx={{padding: matches_700 ? "8px" : "2px"}}>
                {isEdit
                    ? (<TextField name={"name"}
                                  value={orderItem.name}
                                  variant="standard"
                                  onChange={handleInputChange}/>)
                    : orderItem.name}
            </StyledTableCell>
            <StyledTableCell sx={{padding: matches_700 ? "8px" : "2px"}}>
                {isEdit
                    ? (<TextField name={"catalogNumber"}
                                  value={orderItem.catalogNumber}
                                  variant="standard"
                                  onChange={handleInputChange}/>)
                    : orderItem.catalogNumber}
            </StyledTableCell>
            <StyledTableCell align={CENTER} sx={{padding: matches_700 ? "8px" : 0}}>
                {isEdit
                    ? (<Stack direction={ROW} alignItems={CENTER} spacing={matches_700 ? 1 : 0}>
                        {matches_500 && (
                            <IconButton aria-label="minus"
                                        onClick={handleMinusClick}
                                        disabled={orderItem.count < 2}>
                                <RemoveIcon/>
                            </IconButton>)}
                        <StyledTextField name={"count"}
                                         value={orderItem.count}
                                         inputProps={{style: {textAlign: "center"}}}
                                         type={"number"}
                                         variant="standard"
                                         sx={{width: "60px"}}
                                         onChange={handleCountChange}
                        />
                        {matches_500 && (
                            <IconButton aria-label="plus" onClick={handlePlusClick}>
                                <AddIcon/>
                            </IconButton>
                        )}
                    </Stack>)
                    : orderItem.count}
            </StyledTableCell>
            {!isLimitedOverview && matches_700 && (
                <StyledTableCell sx={{padding: matches_700 ? "8px" : "2px"}}>
                    {isEdit
                        ? (<TextField name={"comment"}
                                      value={orderItem.comment}
                                      variant="standard"
                                      onChange={handleInputChange}/>)
                        : orderItem.comment}
                </StyledTableCell>
            )}
            <StyledTableCell align={CENTER} sx={{padding: matches_700 ? "8px" : 0}}>
                {isEdit && (<IconButton aria-label="delete"
                                        onClick={handleRemoveClick}
                                        disabled={orderItem.id === 0}>
                    <DeleteIcon/>
                </IconButton>)}
                {isSelectPositionMode && (<Checkbox
                    id={positionCheckBoxId}
                    checked={isPositionSelected}
                    onChange={handleSelectPosition}
                    inputProps={{"aria-label": "controlled"}}
                />)}
                {!isEdit && !isSelectPositionMode && orderItem.invoiceId &&  (
                    <>
                        {matches_700
                            ? (<Chip onClick={handleInvoiceClick}
                                     label={extractAllText(supplierName)}
                                     color={PRIMARY}/>)
                            : (<IconButton onClick={handleInvoiceClick} color={PRIMARY}>
                                <ReceiptIcon/>
                            </IconButton>)}
                    </>)}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default OrderPositionsListItem;