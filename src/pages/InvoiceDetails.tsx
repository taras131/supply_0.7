import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { routes } from "utils/routes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InvoiceDetailsStepper from "../components/InvoiceDetailsStepper";
import InvoiceDetailsActions from "../components/InvoiceDetailsActions";
import InvoiceDetailsComments from "../components/InvoiceDetailsComments";
import { TLocation } from "../../models/i-location";
import { commentPanelId } from "utils/const";
import { shipmentPanelId } from "utils/const";
import Grid from "@mui/material/Unstable_Grid2";
import OrdersList from "../components/OrdersList";
import { getRelatedOrdersByInvoiceId } from "store/selectors/orders";
import PageHeaderWithTitleAndButton from "../components/PageHeaderWithTitleAndButton";
import PageLayout from "../components/PageLayout";
import InvoiceDetailsInfo from "../components/InvoiceDetailsInfo";
import ShipmentsList from "../components/ShipmentsList";
import { getRelatedMachineryByInvoiceId } from "store/selectors/machinery";
import MachineryList from "../components/MachineryList";
import { selectShipmentsByInvoiceId } from "features/shipments/model/shipmentsSlice";
import { useAppSelector } from "hooks/redux";
import { selectInvoiceById } from "store/reducers/invoices";

const InvoiceDetails = () => {
  const matches_700 = useMediaQuery("(min-width:700px)");
  const invoiceId = useParams().invoiceId || "0";
  const location = useLocation() as TLocation;
  const invoice = useAppSelector(selectInvoiceById(invoiceId));
  const relatedShipments = useAppSelector(selectShipmentsByInvoiceId(invoiceId));
  const relatedOrders = useAppSelector((state) => getRelatedOrdersByInvoiceId(state, invoiceId));
  const relatedMachinery = useAppSelector((state) => getRelatedMachineryByInvoiceId(state, invoiceId));
  const [expanded, setExpanded] = useState<string | false>(false);
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
        icon={<ArrowBackIosIcon />}
      />
      <Grid container sx={{ width: "100%" }} pt={matches_700 ? 0 : 2} spacing={matches_700 ? 6 : 4}>
        <Grid xs={matches_700 ? 7 : 12}>
          <InvoiceDetailsInfo invoice={invoice} />
        </Grid>
        <Grid xs={matches_700 ? 5 : 12}>
          <InvoiceDetailsStepper invoice={invoice} shipment={relatedShipments[0] ? relatedShipments[0] : false} />
        </Grid>
      </Grid>
      <Stack sx={{ width: "100%" }} spacing={3}>
        <InvoiceDetailsActions invoice={invoice} />
      </Stack>
      {relatedOrders && relatedOrders.length > 0 && (
        <Stack sx={{ width: "100%" }} spacing={1}>
          <Typography fontSize={"16px"} fontWeight={600}>
            Связанные заявки:
          </Typography>
          <OrdersList orders={relatedOrders} />
        </Stack>
      )}
      {relatedShipments.length > 0 && (
        <Stack sx={{ width: "100%" }} spacing={1}>
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
        <Stack sx={{ width: "100%" }} spacing={1}>
          <Typography fontSize={"16px"} fontWeight={600}>
            Связанная техника:
          </Typography>
          <MachineryList machinery={relatedMachinery} />
        </Stack>
      )}
      <InvoiceDetailsComments
        expanded={expanded}
        handleExpandedChange={handleExpandedChange(commentPanelId)}
        invoiceId={invoiceId}
      />
    </PageLayout>
  );
};

export default InvoiceDetails;
