import React, {FC} from "react";
import {IShipmentsInvoice} from "../models/iShipments";
import {useAppSelector} from "../hooks/redux";
import {getInvoiceById} from "../store/selectors/invoices";
import {IconButton, ListItem, Stack, Typography} from "@mui/material";
import {convertMillisecondsToDate} from "../utils/services";
import {getSupplierNameById} from "../store/selectors/suppliers";
import GetAppIcon from "@mui/icons-material/GetApp";
import Divider from "@mui/material/Divider";

interface IProps {
    shipmentInvoice: IShipmentsInvoice
}

const ShipmentsListItemInvoice: FC<IProps> = ({shipmentInvoice}) => {
    const invoice = useAppSelector(state => getInvoiceById(state, shipmentInvoice.invoiceId));
    const supplierName = useAppSelector(state => getSupplierNameById(state, invoice.supplierId));
    return (
        <>
            <ListItem alignItems="flex-start">
                <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"} sx={{width: "100%"}}>
                    <Typography>
                        {convertMillisecondsToDate(invoice.author.date)}
                    </Typography>
                    <Typography>
                        {supplierName}
                    </Typography>
                    <Typography>
                        Счёт № {invoice.number}
                    </Typography>
                    <Typography>
                        {new Intl.NumberFormat("ru-RU").format(invoice.amount)} руб.
                    </Typography>
                    <IconButton aria-label="arrow" href={invoice.invoiceFileLink}>
                        <GetAppIcon color={"primary"}/>
                    </IconButton>
                </Stack>
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>
    );
};

export default ShipmentsListItemInvoice;