import React from 'react';
import {Link, useParams} from "react-router-dom";
import {
    Button, Paper,
    Stack,
    Typography
} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getInvoiceById} from "../store/selectors/invoices";
import {getSupplierINNById, getSupplierNameById} from "../store/selectors/suppliers";
import {routes} from "../utils/routes";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InvoiceDetailsStepper from "../components/InvoiceDetailsStepper";
import InvoiceDetailsItem from "../components/InvoiceDetailsItem";
import InvoiceDetailsActions from "../components/InvoiceDetailsActions";
import InvoiceDetailsCancel from "../components/InvoiceDetailsCancel";

const InvoiceDetails = () => {
    const invoiceId = useParams().invoiceId || "0";
    const invoice = useAppSelector(state => getInvoiceById(state, invoiceId))
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId))
    const supplierINN = useAppSelector(state => getSupplierINNById(state, invoice.supplierId))

    return (
        <Stack alignItems="center">
            <Paper sx={{maxWidth: "1000px", width: "100%", backgroundColor: "white", padding: "20px"}}>
                <Stack spacing={5} alignItems="center">
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                           sx={{width: "100%"}}>
                        <Typography variant={"h2"} fontWeight={700} fontSize={"20px"}>
                            Подробная информация по счёту:
                        </Typography>
                        <Link to={routes.invoices}>
                            <Button fullWidth variant={"contained"} startIcon={<ArrowBackIosIcon/>}>
                                Назад
                            </Button>
                        </Link>
                    </Stack>
                    <Stack sx={{width: "100%"}} spacing={3}>
                        <InvoiceDetailsItem title={"№ :"} value={invoice.number}/>
                        <InvoiceDetailsItem title={"Поставщик :"} value={supplierName}/>
                        <InvoiceDetailsItem title={"ИНН :"} value={supplierINN}/>
                        <InvoiceDetailsItem title={"Сумма :"} value={invoice.amount + " руб."}/>
                        <InvoiceDetailsItem title={"НДС :"} value={invoice.isWithVAT ? "Да" : "Нет"}/>
                        <InvoiceDetailsItem title={"Оплачен :"} value={invoice.paid.isPaid ? "Да" : "Нет"}/>
                        <InvoiceDetailsActions {...invoice}/>
                        <InvoiceDetailsStepper {...invoice}/>
                        <InvoiceDetailsCancel {...invoice}/>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default InvoiceDetails;