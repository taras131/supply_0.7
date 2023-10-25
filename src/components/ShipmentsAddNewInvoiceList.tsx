import React, {FC} from "react";
import {useAppSelector} from "../hooks/redux";
import {getInvoices} from "../store/selectors/invoices";
import ShipmentsAddNewInvoiceItem from "./ShipmentsAddNewInvoiceItem";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
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
    const invoicesList = invoices.map(invoice => (<ShipmentsAddNewInvoiceItem key={invoice.id}
                                                                              selectedInvoices={selectedInvoices}
                                                                              handleChangeSelectedInvoices={handleChangeSelectedInvoices}
                                                                              invoice={invoice}
                                                                              handleValueChange={handleValueChange}/>
    ));
    return (
        <div>
            <Typography>
                Прикрепите счета, вошедшие в отгрузку
            </Typography>
            <TableContainer component={Paper} sx={{maxWidth: 1350, mt: 3}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontSize="14px" fontWeight={600}>
                                    Выбран
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize="14px" fontWeight={600}>
                                    Дата
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize="18px" fontWeight={600}>
                                    Поставщик
                                </Typography>
                            </TableCell>
                            <TableCell align={"center"}>
                                <Typography fontSize="14px" fontWeight={600}>
                                    Сумма
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize="14px" fontWeight={600}>
                                    Оплачен
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize="14px" fontWeight={600}>
                                    Счёт
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Typography fontSize="14px" fontWeight={600}>
                                    Ещё
                                </Typography>
                            </TableCell>
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