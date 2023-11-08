import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
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
import NameWithValue from "../components/NameWithValue";
import InvoiceDetailsActions from "../components/InvoiceDetailsActions";
import InvoiceDetailsCancel from "../components/InvoiceDetailsCancel";
import InvoiceDetailsComments from "../components/InvoiceDetailsComments";
import {TLocation} from "../../models/i-location";
import {commentPanelId} from "../utils/const";
import {shipmentPanelId} from "../utils/const";
import {getShipmentsByInvoiceId} from "../store/selectors/shipments";
import InvoiceDetailsShipment from "../components/InvoiceDetailsShipment";
import ApprovedInvoiceCheckbox from "../components/ApprovedInvoiceCheckbox";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InvoicesList from "../components/InvoicesList";
import OrdersList from "../components/OrdersList";
import {getRelatedOrdersByInvoiceId} from "../store/selectors/orders";
import {CENTER} from "../styles/const";

const InvoiceDetails = () => {
    const invoiceId = useParams().invoiceId || "0";
    const location = useLocation() as TLocation;
    const navigate = useNavigate();
    const invoice = useAppSelector(state => getInvoiceById(state, invoiceId));
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId));
    const supplierINN = useAppSelector(state => getSupplierINNById(state, invoice.supplierId));
    const shipments = useAppSelector(state => getShipmentsByInvoiceId(state, invoiceId));
    const relatedOrders = useAppSelector(state => getRelatedOrdersByInvoiceId(state, invoiceId));
    const [expanded, setExpanded] = useState<string | false>(false);
    useEffect(() => {
        if (location.state && location.state.isCommentClick) setExpanded(commentPanelId);
    }, [location]);
    const handleExpandedChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleBackClick = () => {
        if (location.state && location.state.from) {
            navigate(location.state.from);
        } else {
            navigate(routes.orders);
        }
    };
    return (
        <Stack alignItems={CENTER} spacing={2}>
            <Paper sx={{maxWidth: "1000px", width: "100%", backgroundColor: "white", padding: "20px"}}>
                <Stack spacing={5} alignItems="center">
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                           sx={{width: "100%"}}>
                        <Typography variant={"h2"} fontWeight={700} fontSize={"20px"}>
                            Подробная информация по счёту:
                        </Typography>
                        <Button sx={{width: "150px"}} onClick={handleBackClick} fullWidth variant={"contained"}
                                startIcon={<ArrowBackIosIcon/>}>
                            Назад
                        </Button>
                    </Stack>
                    <Grid container sx={{width: "100%"}} spacing={6}>
                        <Grid xs={8}>
                            <NameWithValue title={"№ :"} value={invoice.number}/>
                            <Divider/>
                            <NameWithValue title={"Поставщик :"} value={supplierName}/>
                            <Divider/>
                            <NameWithValue title={"ИНН :"} value={supplierINN}/>
                            <Divider/>
                            <NameWithValue title={"Сумма :"} value={invoice.amount + " руб."}/>
                            <Divider/>
                            <NameWithValue title={"НДС :"} value={invoice.isWithVAT ? "Да" : "Нет"}/>
                            <Divider/>
                            <NameWithValue title={"Одобрен :"}>
                                <ApprovedInvoiceCheckbox invoice={invoice}/>
                            </NameWithValue>
                        </Grid>
                        <Grid xs={4}>
                            <InvoiceDetailsStepper invoice={invoice} shipment={shipments[0] ? shipments[0] : false}/>
                        </Grid>
                    </Grid>
                    <Stack sx={{width: "100%"}} spacing={3}>
                        <InvoiceDetailsActions {...invoice}/>
                        <InvoiceDetailsCancel {...invoice}/>
                    </Stack>
                </Stack>
            </Paper>
            {relatedOrders && relatedOrders.length > 0 && (
                <Stack sx={{maxWidth: 1000 ,width: "100%"}} spacing={2}>
                    <Typography fontSize={"20px"} fontWeight={600}>
                        Связанные заявки:
                    </Typography>
                    <OrdersList orders={relatedOrders}/>
                </Stack>
            )}
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