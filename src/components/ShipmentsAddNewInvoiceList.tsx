import React, {FC} from "react";
import {useAppSelector} from "../hooks/redux";
import {getInvoices} from "../store/selectors/invoices";
import ShipmentsAddNewInvoiceItem from "./ShipmentsAddNewInvoiceItem";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {IShipmentsInvoice, TShipmentInvoiceValue} from "../models/iShipments";

interface IProps {
    selectedInvoices: IShipmentsInvoice []
    handleChangeSelectedInvoices: (invoiceId: string) => void
    handleValueChange: (invoiceId: string, newValue: TShipmentInvoiceValue) => void
}

const ShipmentsAddNewInvoiceList: FC<IProps> = ({
                                                    selectedInvoices,
                                                    handleChangeSelectedInvoices,
                                                    handleValueChange,
                                                }) => {
    const invoices = useAppSelector(state => getInvoices(state, false, true));
    const matches_900 = useMediaQuery("(min-width:900px)");
    const matches_600 = useMediaQuery("(min-width:600px)");
    const matches_500 = useMediaQuery("(min-width:500px)");
    const invoicesList = invoices.map(invoice => (<ShipmentsAddNewInvoiceItem key={invoice.id}
                                                                              selectedInvoices={selectedInvoices}
                                                                              handleChangeSelectedInvoices={handleChangeSelectedInvoices}
                                                                              invoice={invoice}
                                                                              handleValueChange={handleValueChange}/>
    ));
    return (
        <div>
            <Typography fontSize={"16px"} fontWeight={550}>
                Отметьте счета, вошедшие в отгрузку:
            </Typography>
            <TableContainer sx={{maxWidth: 1000, mt: 3}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{padding: matches_900 ? "16px" : "4px"}}>
                                <Typography fontSize="14px" fontWeight={600}>
                                    {matches_900 ? "Выбран" : ""}
                                </Typography>
                            </TableCell>
                            {matches_600 && (
                                <TableCell sx={{padding: matches_900 ? "16px" : "4px"}}>
                                    <Typography fontSize="14px" fontWeight={600}>
                                        Дата
                                    </Typography>
                                </TableCell>
                            )}
                            <TableCell sx={{padding: matches_900 ? "16px" : "4px"}}>
                                <Typography fontSize="14px" fontWeight={600}>
                                    Поставщик
                                </Typography>
                            </TableCell>
                            <TableCell align={"center"} sx={{padding: matches_900 ? "16px" : "4px"}}>
                                <Typography fontSize="14px" fontWeight={600}>
                                    Сумма
                                </Typography>
                            </TableCell>
                            {matches_900 && (
                                <TableCell>
                                    <Typography fontSize="14px" fontWeight={600}>
                                        Оплачен
                                    </Typography>
                                </TableCell>
                            )}
                            <TableCell align="center" sx={{padding: matches_900 ? "16px" : "4px"}}>
                                <Typography fontSize="14px" fontWeight={600}>
                                    Счёт
                                </Typography>
                            </TableCell>
                            {matches_500 && (
                                <TableCell align="center" sx={{padding: matches_900 ? "16px" : "4px"}}>
                                    <Typography fontSize="14px" fontWeight={600}>
                                        Ещё
                                    </Typography>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoicesList ? invoicesList : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ShipmentsAddNewInvoiceList;