import React, {useState} from "react";
import {Stack, useMediaQuery} from "@mui/material";
import InvoicesHeader from "../components/InvoicesHeader";
import {useAppSelector} from "../hooks/redux";
import {getInvoices} from "../store/selectors/invoices";
import InvoicesHelper from "../components/InvoicesHelper";
import InvoicesInfo from "../components/InvoicesInfo";
import InvoicesList from "../components/InvoicesList";

const Invoices = () => {
    const [isShowCanceledInvoice, setIsShowCanceledInvoice] = useState(false);
    const [isShowPaidInvoice, setIsShowPaidInvoice] = useState(true);
    const matches_700 = useMediaQuery("(min-width:700px)");
    const invoices = useAppSelector(state => getInvoices(state, isShowCanceledInvoice, isShowPaidInvoice));
    const handleCanceledInvoiceChange = () => {
        setIsShowCanceledInvoice(prev => !prev);
    };
    const handlePaidInvoiceChange = () => {
        setIsShowPaidInvoice(prev => !prev);
    };

    return (
        <Stack alignItems="center" spacing={matches_700 ? 3 : 1}>
            <InvoicesHeader isShowCanceledInvoice={isShowCanceledInvoice}
                            isShowPaidInvoice={isShowPaidInvoice}
                            handleCanceledInvoiceChange={handleCanceledInvoiceChange}
                            handlePaidInvoiceChange={handlePaidInvoiceChange}/>
            <InvoicesInfo/>
            <InvoicesList invoices={invoices}/>
            <InvoicesHelper/>
        </Stack>
    );
};

export default Invoices;