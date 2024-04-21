import React, {useEffect, useState} from "react";
import {Stack, useMediaQuery} from "@mui/material";
import InvoicesHeader from "../components/InvoicesHeader";
import {useAppSelector} from "../hooks/redux";
import {getInvoices} from "../store/selectors/invoices";
import InvoicesHelper from "../components/InvoicesHelper";
import InvoicesList from "../components/InvoicesList";
import InvoicesFilter from "../components/InvoicesFilter";
import {IInvoice} from "../models/iInvoices";
import {ALL} from "../utils/const";
import {useSearchParams} from "react-router-dom";

const Invoices = () => {
    const [isShowCanceledInvoice, setIsShowCanceledInvoice] = useState(false);
    const [isShowPaidInvoice, setIsShowPaidInvoice] = useState(true);
    const invoices = useAppSelector(state => getInvoices(state));
    const [supplierFilterParams, setSupplierFilterParams] = useSearchParams()
    const [filteredInvoice, setFilteredInvoice] = useState<IInvoice []>(invoices);
    const matches_700 = useMediaQuery("(min-width:700px)");
    const setSupplierFilter = (value: string) => {
        if (value === ALL) {
            setSupplierFilterParams({})
        } else {
            setSupplierFilterParams({supplierFilter: value})
        }
    }
    const handleCanceledInvoiceChange = () => {
        setIsShowCanceledInvoice(prev => !prev);
    };
    const handlePaidInvoiceChange = () => {
        setIsShowPaidInvoice(prev => !prev);
    };
    const supplierFilter = supplierFilterParams.get("supplierFilter") || ALL
    useEffect(() => {
        let newFilteredInvoice = [...invoices]
        if (supplierFilter !== ALL) {
            newFilteredInvoice = [...newFilteredInvoice.filter(invoice => invoice.supplierId === supplierFilter)]
        }
        if (!isShowCanceledInvoice) {
            newFilteredInvoice = [...newFilteredInvoice.filter(invoice => !(invoice.cancel && invoice.cancel.isCancel))]
        }
        if (!isShowPaidInvoice) {
            newFilteredInvoice = [...newFilteredInvoice.filter(invoice => !invoice.paid.isPaid)]
        }
        setFilteredInvoice(newFilteredInvoice)
    }, [supplierFilter, isShowCanceledInvoice, isShowPaidInvoice])
    return (
        <Stack alignItems="center" spacing={matches_700 ? 3 : 2}>
            <InvoicesHeader/>
            <InvoicesFilter filter={supplierFilter}
                            setSupplierFilter={setSupplierFilter}
                            isShowCanceledInvoice={isShowCanceledInvoice}
                            isShowPaidInvoice={isShowPaidInvoice}
                            handleCanceledInvoiceChange={handleCanceledInvoiceChange}
                            handlePaidInvoiceChange={handlePaidInvoiceChange}/>
            <InvoicesList invoices={filteredInvoice}/>
            <InvoicesHelper/>
        </Stack>
    );
};

export default Invoices;