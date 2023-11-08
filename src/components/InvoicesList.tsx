import React, {FC} from "react";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import InvoicesListHeader from "./InvoicesListHeader";
import InvoicesListItem from "./InvoicesListItem";
import {IInvoice} from "../models/iInvoices";

interface IProps {
    invoices: IInvoice []
}

const InvoicesList:FC<IProps> = ({invoices}) => {
    const invoicesList = invoices.map(invoice => (<InvoicesListItem key={invoice.author.date} {...invoice}/>));
    return (
        <TableContainer component={Paper} sx={{maxWidth: 1350}}>
            <Table aria-label="simple table">
                <InvoicesListHeader/>
                <TableBody>
                    {invoicesList ? invoicesList : ""}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default InvoicesList;