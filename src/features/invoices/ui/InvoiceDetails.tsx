import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import {routes} from "utils/routes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InvoiceDetailsStepper from "features/invoices/ui/InvoiceDetailsStepper";
import InvoiceDetailsActions from "features/invoices/ui/InvoiceDetailsActions";
import InvoiceDetailsComments from "features/invoices/ui/InvoiceDetailsComments";
import {commentPanelId} from "utils/const";
import {shipmentPanelId} from "utils/const";
import Grid from "@mui/material/Unstable_Grid2";
import OrdersList from "features/orders/ui/OrdersList";
import PageHeaderWithTitleAndButton from "components/PageHeaderWithTitleAndButton";
import PageLayout from "components/PageLayout";
import InvoiceDetailsInfo from "features/invoices/ui/InvoiceDetailsInfo";
import ShipmentsList from "features/shipments/ui/ShipmentsList";
import {getRelatedMachineryByInvoiceId} from "features/machinery/model/selectors";
import {useAppSelector} from "hooks/redux";
import {getOrders, getRelatedOrdersByInvoiceId} from "features/orders/model/selectors";
import {selectShipmentsByInvoiceId} from "features/shipments/model/selectors";
import {getInvoiceById} from "features/invoices/model/selectors";
import MachineryTable from "../../machinery/ui/MachineryTable";

const InvoiceDetails = () => {
    const matches_700 = useMediaQuery("(min-width:700px)");
    const invoiceId = useParams().invoiceId || "0";
    const [isShowOrdersPosition, setIsShowOrdersPosition] = useState(false);
    const location = useLocation() as TLocation;
    const invoice = useAppSelector(state => getInvoiceById(state, invoiceId));
    const forSelectPositionsOrders = useAppSelector((state) => getOrders(state, true, false));
    const relatedShipments = useAppSelector(selectShipmentsByInvoiceId(invoiceId));
    const relatedOrders = useAppSelector((state) => getRelatedOrdersByInvoiceId(state, invoiceId));
    const relatedMachinery = useAppSelector((state) => getRelatedMachineryByInvoiceId(state, invoiceId));
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleIsShowOrdersPositionChange = () => {
        setIsShowOrdersPosition(prev => !prev);
    };
    useEffect(() => {
        if (location.state && location.state.isCommentClick) setExpanded(commentPanelId);
        if (location.state && location.state.isShipmentClick) setExpanded(shipmentPanelId);
    }, [location]);

    const handleExpandedChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    const backRoute = location.state && location.state.from ? location.state.from : routes.invoices;
    return (
        <PageLayout maxWidth={1000}>
            <PageHeaderWithTitleAndButton
                route={backRoute}
                title={"Информация по счёту:"}
                buttonText={"Назад"}
                maxWidth={"1000px"}
                icon={<ArrowBackIosIcon/>}
            />
            <Grid container sx={{width: "100%"}} pt={matches_700 ? 0 : 2} spacing={matches_700 ? 6 : 4}>
                <Grid xs={matches_700 ? 7 : 12}>
                    <InvoiceDetailsInfo invoice={invoice}/>
                </Grid>
                <Grid xs={matches_700 ? 5 : 12}>
                    <InvoiceDetailsStepper invoice={invoice}
                                           shipment={relatedShipments[0] ? relatedShipments[0] : false}/>
                </Grid>
            </Grid>
            <Stack sx={{width: "100%"}} spacing={3}>
                <InvoiceDetailsActions invoice={invoice}
                                       isShowOrdersPosition={isShowOrdersPosition}
                                       handleIsShowOrdersPositionChange={handleIsShowOrdersPositionChange}/>
            </Stack>
            {relatedOrders && relatedOrders.length > 0 && (
                <Stack sx={{width: "100%"}} spacing={1}>
                    <Typography fontSize={"16px"} fontWeight={600}>
                        Связанные заявки:
                    </Typography>
                    <OrdersList orders={relatedOrders}/>
                </Stack>
            )}
            {relatedShipments.length > 0 && (
                <Stack sx={{width: "100%"}} spacing={1}>
                    <Typography fontSize={"16px"} fontWeight={600}>
                        Связанные отгрузки:
                    </Typography>
                    <ShipmentsList
                        shipments={relatedShipments}
                        extendShipmentId={
                            relatedShipments.length && location.state && location.state.isShipmentClick
                                ? relatedShipments[0].id
                                : false
                        }
                    />
                </Stack>
            )}
            {relatedMachinery.length > 0 && (
                <Stack sx={{width: "100%"}} spacing={1}>
                    <Typography fontSize={"16px"} fontWeight={600}>
                        Связанная техника:
                    </Typography>
                    <MachineryTable rows={relatedMachinery}/>
                </Stack>
            )}
            {isShowOrdersPosition && (<OrdersList isSelectPositionMode orders={forSelectPositionsOrders}/>)}
            <InvoiceDetailsComments
                expanded={expanded}
                handleExpandedChange={handleExpandedChange(commentPanelId)}
                invoiceId={invoiceId}
            />

        </PageLayout>
    );
};

export default InvoiceDetails;
