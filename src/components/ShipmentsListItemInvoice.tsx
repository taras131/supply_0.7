import React, {FC} from "react";
import {IShipmentsInvoice} from "../models/iShipments";
import {useAppSelector} from "../hooks/redux";
import {getInvoiceById} from "../store/selectors/invoices";
import {IconButton, ListItem, Stack, Typography} from "@mui/material";
import {convertMillisecondsToDate} from "../utils/services";
import {getSupplierNameById} from "../store/selectors/suppliers";
import GetAppIcon from "@mui/icons-material/GetApp";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import Battery30Icon from "@mui/icons-material/Battery30";

interface IProps {
    shipmentInvoice: IShipmentsInvoice
}

const ShipmentsListItemInvoice: FC<IProps> = ({shipmentInvoice}) => {
    const invoice = useAppSelector(state => getInvoiceById(state, shipmentInvoice.invoiceId));
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId));
    return (
        <>
            <ListItem alignItems="flex-start" sx={{paddingRight: 0, paddingLeft: 0}}>
                <Grid sx={{width: "100%"}} container  alignItems={"center"}>
                    <Grid xs={2}>
                        <Typography>
                            {convertMillisecondsToDate(invoice.author.date)}
                        </Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography>
                            {supplierName}
                        </Typography>
                    </Grid>
                    <Grid xs={3}>
                        <Typography>
                            {invoice.number}
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography>
                            {new Intl.NumberFormat("ru-RU").format(invoice.amount)} руб.
                        </Typography>
                    </Grid>
                    <Grid xs={1}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={1}>
                            {shipmentInvoice.volume === "completely"
                                ? (<BatteryFullIcon/>)
                                : (<Battery30Icon/>)}
                            <IconButton aria-label="arrow" href={invoice.invoiceFileLink} sx={{paddingRight: 0}}>
                                <GetAppIcon color={"primary"}/>
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    );
};

export default ShipmentsListItemInvoice;