import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {
    Button, Paper,
    Stack,
    Typography,
} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getInvoiceById} from "../store/selectors/invoices";
import {getSupplierINNById, getSupplierNameById} from "../store/selectors/suppliers";
import {routes} from "../utils/routes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InvoiceDetailsStepper from "../components/InvoiceDetailsStepper";
import InvoiceDetailsItem from "../components/InvoiceDetailsItem";
import InvoiceDetailsActions from "../components/InvoiceDetailsActions";
import InvoiceDetailsCancel from "../components/InvoiceDetailsCancel";
import InvoiceDetailsComments from "../components/InvoiceDetailsComments";
import {TLocation} from "../../models/i-location";
import {commentPanelId} from "../utils/const";
import {shipmentPanelId} from "../utils/const";
import {getShipmentsByInvoiceId} from "../store/selectors/shipments";
import InvoiceDetailsShipment from "../components/InvoiceDetailsShipment";

const InvoiceDetails = () => {
    const invoiceId = useParams().invoiceId || "0";
    const location = useLocation() as TLocation;
    const invoice = useAppSelector(state => getInvoiceById(state, invoiceId));
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId));
    const supplierINN = useAppSelector(state => getSupplierINNById(state, invoice.supplierId));
    const shipments = useAppSelector(state => getShipmentsByInvoiceId(state, invoiceId));
    const [expanded, setExpanded] = useState<string | false>(false);
    useEffect(() => {
        if (location.state && location.state.isCommentClick) setExpanded(commentPanelId);
    }, [location]);
    const handleExpandedChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <Stack alignItems="center" spacing={2}>
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
                        <InvoiceDetailsItem title={"Отгружен :"} value={shipments.length > 0 ? "Да" : "Нет"}/>
                        <InvoiceDetailsActions {...invoice}/>
                        <InvoiceDetailsStepper {...invoice}/>
                        <InvoiceDetailsCancel {...invoice}/>
                    </Stack>
                </Stack>
            </Paper>
            {shipments.length > 0 && (
                <InvoiceDetailsShipment shipments={shipments}
                                        handleExpandedChange={handleExpandedChange(shipmentPanelId)}
                                        expanded={expanded}/>
            )}
            <InvoiceDetailsComments expanded={expanded}
                                    handleExpandedChange={handleExpandedChange(commentPanelId)}
                                    invoiceId={invoiceId}/>
        </Stack>
    );
};

export default InvoiceDetails;