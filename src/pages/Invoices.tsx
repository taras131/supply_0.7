import React from 'react';
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography,
} from "@mui/material";
import InvoicesHeader from "../components/InvoicesHeader";
import {useAppSelector} from "../hooks/redux";
import {getInvoices} from "../store/selectors/invoices";
import Invoice from "../components/Invoice";
import InvoicesHelper from "../components/InvoicesHelper";

const Invoices = () => {
    const invoices = useAppSelector(state => getInvoices(state))
    const invoicesList = invoices.map(invoice => (<Invoice key={invoice.author.date} {...invoice}/>))
    return (
        <Stack style={{minHeight: "calc(100vh - 100px"}} alignItems="center">
            <InvoicesHeader/>
            <TableContainer component={Paper} sx={{maxWidth: 1350, mt: 3}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontSize="18px" fontWeight={600}>
                                    Одобрен
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize="18px" fontWeight={600}>
                                    Дата
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize="18px" fontWeight={600}>
                                    Поставщик
                                </Typography></TableCell>
                            <TableCell align={"center"}>
                                <Typography fontSize="18px" fontWeight={600}>
                                    ИНН
                                </Typography>
                            </TableCell>
                            <TableCell align={"center"}>
                                <Typography fontSize="18px" fontWeight={600}>
                                    Сумма
                                </Typography>
                            </TableCell>
                            <TableCell align={"center"}>
                                <Typography fontSize="18px" fontWeight={600}>
                                    НДС
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontSize="18px" fontWeight={600}>
                                    Оплачен
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize="18px" fontWeight={600}>
                                    Счёт
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize="14px" fontWeight={600}>
                                    Платёжное поручение
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize="18px" fontWeight={600}>
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
            <InvoicesHelper/>
        </Stack>
    );
};

export default Invoices;