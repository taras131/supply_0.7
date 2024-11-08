import React, { FC } from "react";
import { Stack } from "@mui/material";
import TitleWithValue from "components/TitleWithValue";
import Divider from "@mui/material/Divider";
import ApprovedInvoiceCheckbox from "features/invoices/ui/ApprovedInvoiceCheckbox";
import { useAppSelector } from "hooks/redux";
import { getSupplierINNById, getSupplierNameById } from "store/selectors/suppliers";
import { STRING_EMPTY } from "utils/const";
import { IInvoice } from "models/iInvoices";

interface IProps {
  invoice: IInvoice;
}

const InvoiceDetailsInfo: FC<IProps> = ({ invoice }) => {
  const supplierINN = useAppSelector((state) => getSupplierINNById(state, invoice.supplierId));
  const supplierName = useAppSelector((state) => {
    if (invoice.supplierId) {
      return getSupplierNameById(state, invoice.supplierId);
    } else {
      return STRING_EMPTY;
    }
  });
  return (
    <Stack spacing={2}>
      <TitleWithValue title={"№ :"} value={invoice.number} />
      <Divider />
      <TitleWithValue title={"Поставщик :"} value={supplierName} />
      <Divider />
      <TitleWithValue title={"ИНН :"} value={supplierINN} />
      <Divider />
      <TitleWithValue title={"Сумма :"} value={invoice.amount + " руб."} />
      <Divider />
      <TitleWithValue title={"НДС :"} value={invoice.isWithVAT ? "Да" : "Нет"} />
      <Divider />
      <TitleWithValue title={"Одобрен :"}>
        <ApprovedInvoiceCheckbox invoice={invoice} />
      </TitleWithValue>
    </Stack>
  );
};

export default InvoiceDetailsInfo;
