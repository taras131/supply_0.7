import React, {useState} from "react";
import {Stack} from "@mui/material";
import InvoicesHeader from "../components/InvoicesHeader";
import {useAppSelector} from "../hooks/redux";
import {getInvoices} from "../store/selectors/invoices";
import InvoicesHelper from "../components/InvoicesHelper";
import InvoicesInfo from "../components/InvoicesInfo";
import InvoicesList from "../components/InvoicesList";

const Invoices = () => {
    const [isShowCanceledInvoice, setIsShowCanceledInvoice] = useState(false);
    const [isShowPaidInvoice, setIsShowPaidInvoice] = useState(true);
    const invoices = useAppSelector(state => getInvoices(state, isShowCanceledInvoice, isShowPaidInvoice));
    const handleCanceledInvoiceChange = () => {
        setIsShowCanceledInvoice(prev => !prev);
    };
    const handlePaidInvoiceChange = () => {
        setIsShowPaidInvoice(prev => !prev);
    };

    return (
        <Stack style={{minHeight: "calc(100vh - 100px"}} alignItems="center" spacing={3} pt={1}>
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