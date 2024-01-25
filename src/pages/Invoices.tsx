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

const Invoices = () => {
    const [isShowCanceledInvoice, setIsShowCanceledInvoice] = useState(false);
    const [isShowPaidInvoice, setIsShowPaidInvoice] = useState(true);
    const invoices = useAppSelector(state => getInvoices(state));
    const [filter, setFilter] = useState(ALL);
    const [filteredInvoice, setFilteredInvoice] = useState<IInvoice []>(invoices);
    const matches_700 = useMediaQuery("(min-width:700px)");
    const handleCanceledInvoiceChange = () => {
        setIsShowCanceledInvoice(prev => !prev);
    };
    const handlePaidInvoiceChange = () => {
        setIsShowPaidInvoice(prev => !prev);
    };
    useEffect(() => {
        let newFilteredInvoice = [...invoices]
        if (filter !== ALL) {
            newFilteredInvoice = [...newFilteredInvoice.filter(invoice => invoice.supplierId === filter)]
        }
        if (!isShowCanceledInvoice) {
            newFilteredInvoice = [...newFilteredInvoice.filter(invoice => !(invoice.cancel && invoice.cancel.isCancel))]
        }
        if (!isShowPaidInvoice) {
            newFilteredInvoice = [...newFilteredInvoice.filter(invoice => !invoice.paid.isPaid)]
        }
        setFilteredInvoice(newFilteredInvoice)
    }, [filter, isShowCanceledInvoice, isShowPaidInvoice])
    return (
        <Stack alignItems="center" spacing={matches_700 ? 3 : 2}>
            <InvoicesHeader/>
            <InvoicesFilter filter={filter}
                            setFilter={setFilter}
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