import React, {FC, useId} from "react";
import {IInvoice} from "../models/iInvoices";
import {
    Checkbox,
    Chip, FormControl,
    FormControlLabel,
    IconButton, MenuItem, Select, SelectChangeEvent,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import {convertMillisecondsToDate} from "../utils/services";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useAppSelector} from "../hooks/redux";
import {getSupplierNameById} from "../store/selectors/suppliers";
import {IShipmentsInvoice, TShipmentInvoiceValue} from "../models/iShipments";
import {invoiceValues} from "../pages/ShipmentsAddNew";

interface IProps {
    invoice: IInvoice
    selectedInvoices: IShipmentsInvoice []
    handleChangeSelectedInvoices: (invoiceId: string) => void
    handleValueChange: (invoiceId: string, newValue: TShipmentInvoiceValue) => void
}



const ShipmentsAddNewInvoiceItem: FC<IProps> = ({
                                                    invoice,
                                                    selectedInvoices,
                                                    handleChangeSelectedInvoices,
                                                    handleValueChange,
                                                }) => {
    const currentSelected = selectedInvoices.find(selectedInvoice => selectedInvoice.invoiceId === invoice.id);
    const isSelected = currentSelected !== undefined;
    const checkboxId = useId();
    const selectId = useId();
    const handleInvoiceChange = () => {
        handleChangeSelectedInvoices(invoice.id);
    };
    const handleInvoiceValueChange = (e: SelectChangeEvent) => {
        handleValueChange(invoice.id, e.target.value as TShipmentInvoiceValue);
    };
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId));
    const valueList = invoiceValues.map(value => (<MenuItem key={value.value}
                                                            value={value.value}>{value.title}</MenuItem>));
    return (
        <TableRow sx={{"&:last-child td, &:last-child th": {border: 0}}}>
            <TableCell align={"center"}>
                <FormControlLabel
                    control={<Checkbox checked={isSelected}
                                       onChange={handleInvoiceChange}
                                       color={"success"}
                                       id={checkboxId}
                                       sx={{"& .MuiSvgIcon-root": {fontSize: 38}}}/>}/>
            </TableCell>
            <TableCell sx={{color: "black"}}>{convertMillisecondsToDate(invoice.author.date)}</TableCell>
            <TableCell sx={{color: "black"}}>{supplierName}</TableCell>
            <TableCell sx={{cursor: "pointer"}} align={"right"}>
                <Typography sx={{color: "black"}}>
                    {new Intl.NumberFormat("ru-RU").format(invoice.amount)} руб.
                </Typography>
            </TableCell>
            <TableCell
                sx={{color: "black"}}
                align={"center"}>
                {invoice.paid.isPaid
                    ? convertMillisecondsToDate(invoice.paid.date)
                    : (
                        <Typography color={invoice.cancel && invoice.cancel.isCancel ? "#FF0033" : "black"}
                                    fontWeight={invoice.cancel && invoice.cancel.isCancel ? 600 : 400}>
                            {invoice.cancel && invoice.cancel.isCancel
                                ? "Отменён"
                                : "Нет"}
                        </Typography>
                    )}
            </TableCell>
            <TableCell sx={{color: "black"}} align="center">
                {isSelected
                    ? (<FormControl fullWidth sx={{width: "100%"}}>
                            <Select
                                id={selectId}
                                defaultValue={""}
                                value={currentSelected.volume}
                                onChange={handleInvoiceValueChange}
                                sx={{overflow: "hidden"}}
                            >
                                {valueList}
                            </Select>
                        </FormControl>
                    )
                    : (<Chip
                        label={"Скачать"}
                        component="a"
                        href={invoice.invoiceFileLink}
                        icon={<DownloadIcon/>}
                        color={"success"}
                        clickable
                    />)}
            </TableCell>
            <TableCell>
                <IconButton aria-label="add to shopping cart">
                    <MoreVertIcon color="success"/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default ShipmentsAddNewInvoiceItem;