import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {
    Button, Paper,
    Stack,
    Typography, useMediaQuery,
} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getInvoiceById} from "../store/selectors/invoices";
import {getSupplierINNById, getSupplierNameById} from "../store/selectors/suppliers";
import {routes} from "../utils/routes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InvoiceDetailsStepper from "../components/InvoiceDetailsStepper";
import NameWithValue from "../components/NameWithValue";
import InvoiceDetailsActions from "../components/InvoiceDetailsActions";
import InvoiceDetailsComments from "../components/InvoiceDetailsComments";
import {TLocation} from "../../models/i-location";
import {commentPanelId, STRING_EMPTY} from "../utils/const";
import {shipmentPanelId} from "../utils/const";
import {getShipmentsByInvoiceId} from "../store/selectors/shipments";
import InvoiceDetailsShipment from "../components/InvoiceDetailsShipment";
import ApprovedInvoiceCheckbox from "../components/ApprovedInvoiceCheckbox";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import OrdersList from "../components/OrdersList";
import {getRelatedOrdersByInvoiceId} from "../store/selectors/orders";
import {CENTER} from "../styles/const";

const InvoiceDetails = () => {
    const matches_700 = useMediaQuery("(min-width:700px)");
    const invoiceId = useParams().invoiceId || "0";
    const location = useLocation() as TLocation;
    const navigate = useNavigate();
    const invoice = useAppSelector(state => getInvoiceById(state, invoiceId));
    const supplierName = useAppSelector(state => {
        if (invoice.supplierId) {
            return getSupplierNameById(state, invoice.supplierId);
        } else {
            return STRING_EMPTY;
        }
    });
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
                <Stack spacing={matches_700 ? 3 : 1} alignItems="center">
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                           sx={{width: "100%"}}>
                        <Typography variant={"h2"} fontWeight={700} fontSize={"20px"}>
                            Информация по счёту:
                        </Typography>
                        <Button sx={{width: "150px"}} onClick={handleBackClick} fullWidth variant={"contained"}
                                startIcon={<ArrowBackIosIcon/>}>
                            Назад
                        </Button>
                    </Stack>
                    <Grid container sx={{width: "100%"}} spacing={matches_700 ? 6 : 1}>
                        <Grid xs={matches_700 ? 7 : 12}>
                            <Stack spacing={2}>
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
                            </Stack>
                            <NameWithValue title={"Одобрен :"}>
                                <ApprovedInvoiceCheckbox invoice={invoice}/>
                            </NameWithValue>
                        </Grid>
                        <Grid xs={matches_700 ? 5 : 12}>
                            <InvoiceDetailsStepper invoice={invoice} shipment={shipments[0] ? shipments[0] : false}/>
                        </Grid>
                    </Grid>
                    <Stack sx={{width: "100%"}} spacing={3}>
                        <InvoiceDetailsActions {...invoice}/>
                    </Stack>
                </Stack>
            </Paper>
            {relatedOrders && relatedOrders.length > 0 && (
                <Stack sx={{maxWidth: 1000, width: "100%"}} spacing={2}>
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