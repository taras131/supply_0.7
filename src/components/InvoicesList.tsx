import React, {FC} from "react";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import InvoicesListTableHeader from "./InvoicesListTableHeader";
import InvoicesListItem from "./InvoicesListItem";
import {IInvoice} from "../models/iInvoices";

interface IProps {
    invoices: IInvoice []
    forShipmentMode?: boolean
}

const InvoicesList: FC<IProps> = ({invoices, forShipmentMode = false}) => {
    const invoicesList = invoices.map(invoice => (<InvoicesListItem key={invoice.author.date}
                                                                    invoice={invoice}
                                                                    forShipmentMode={forShipmentMode}/>));
    return (
        <TableContainer component={Paper} sx={{maxWidth: 1350}}>
            <Table aria-label="simple table">
                {!forShipmentMode && (<InvoicesListTableHeader/>)}
                <TableBody>
                    {invoicesList ? invoicesList : ""}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default InvoicesList;