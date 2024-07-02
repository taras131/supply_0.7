import React, { FC } from "react";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import InvoicesListTableHeader from "./InvoicesListTableHeader";
import InvoicesListItem from "./InvoicesListItem";
import { IInvoice, IInvoiceForShipments } from "../models/iInvoices";
import Typography from "@mui/material/Typography";
import { CENTER } from "../styles/const";

interface IProps {
  invoices: IInvoice[] | IInvoiceForShipments[];
  forShipmentMode?: boolean;
}

const InvoicesList: FC<IProps> = ({ invoices, forShipmentMode = false }) => {
  const invoicesList = invoices.map((invoice) => (
    <InvoicesListItem key={invoice.author.date} invoice={invoice} forShipmentMode={forShipmentMode} />
  ));
  if (!invoicesList.length) {
    return (
      <Typography fontSize={28} align={CENTER}>
        Попробуйте изменить параметры фильтрации.
      </Typography>
    );
  }
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1350 }}>
      <Table aria-label="simple table">
        {!forShipmentMode && <InvoicesListTableHeader />}
        <TableBody>{invoicesList}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoicesList;
