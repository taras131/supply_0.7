import React, { useEffect, useState } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import InvoicesHeader from "features/invoices/ui/InvoicesHeader";
import InvoicesHelper from "features/invoices/ui/InvoicesHelper";
import InvoicesList from "features/invoices/ui/InvoicesList";
import InvoicesFilter from "features/invoices/ui/InvoicesFilter";
import { IInvoice } from "models/iInvoices";
import { ALL } from "utils/const";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "hooks/redux";
import {selectInvoices} from "features/invoices/model/slice";

const Invoices = () => {
  const [isShowCanceledInvoice, setIsShowCanceledInvoice] = useState(false);
  const [isShowPaidInvoice, setIsShowPaidInvoice] = useState(true);
  const invoices = useAppSelector(selectInvoices);
  const [supplierFilterParams, setSupplierFilterParams] = useSearchParams();
  const [filteredInvoice, setFilteredInvoice] = useState<IInvoice[]>(invoices);
  const matches_700 = useMediaQuery("(min-width:700px)");
  const setSupplierFilter = (value: string) => {
    if (value === ALL) {
      setSupplierFilterParams({});
    } else {
      setSupplierFilterParams({ supplierFilter: value });
    }
  };
  const handleCanceledInvoiceChange = () => {
    setIsShowCanceledInvoice((prev) => !prev);
  };
  const handlePaidInvoiceChange = () => {
    setIsShowPaidInvoice((prev) => !prev);
  };
  const supplierFilter = supplierFilterParams.get("supplierFilter") || ALL;
  useEffect(() => {
    let newFilteredInvoice = invoices.slice(); // важно брать актуальные invoices
    if (supplierFilter !== ALL) {
      newFilteredInvoice = newFilteredInvoice.filter((inv) => inv.supplierId === supplierFilter);
    }
    if (!isShowCanceledInvoice) {
      newFilteredInvoice = newFilteredInvoice.filter((inv) => !(inv.cancel && inv.cancel.isCancel));
    }
    if (!isShowPaidInvoice) {
      newFilteredInvoice = newFilteredInvoice.filter((inv) => !inv.paid?.isPaid);
    }
    setFilteredInvoice(newFilteredInvoice);
  }, [invoices, supplierFilter, isShowCanceledInvoice, isShowPaidInvoice]);
  return (
    <Stack alignItems="center" spacing={matches_700 ? 3 : 2}>
      <InvoicesHeader />
      <InvoicesFilter
        filter={supplierFilter}
        setSupplierFilter={setSupplierFilter}
        isShowCanceledInvoice={isShowCanceledInvoice}
        isShowPaidInvoice={isShowPaidInvoice}
        handleCanceledInvoiceChange={handleCanceledInvoiceChange}
        handlePaidInvoiceChange={handlePaidInvoiceChange}
      />
      <InvoicesList invoices={filteredInvoice} />
      <InvoicesHelper />
    </Stack>
  );
};

export default Invoices;
