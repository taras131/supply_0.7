import React, {FC} from 'react';
import {Stack} from "@mui/material";
import NameWithValue from "./NameWithValue";
import Divider from "@mui/material/Divider";
import ApprovedInvoiceCheckbox from "./ApprovedInvoiceCheckbox";
import {useAppSelector} from "../hooks/redux";
import {getSupplierINNById, getSupplierNameById} from "../store/selectors/suppliers";
import {STRING_EMPTY} from "../utils/const";
import {IInvoice} from "../models/iInvoices";

interface IProps {
    invoice: IInvoice
}

const InvoiceDetailsInfo:FC<IProps> = ({invoice}) => {
    const supplierINN = useAppSelector(state => getSupplierINNById(state, invoice.supplierId));
    const supplierName = useAppSelector(state => {
        if (invoice.supplierId) {
            return getSupplierNameById(state, invoice.supplierId);
        } else {
            return STRING_EMPTY;
        }
    });
    return (
        <Stack spacing={2}>
            <NameWithValue title={"№ :"} value={invoice.number}/>
            <Divider/>
            <NameWithValue title={"Поставщик :"} value={supplierName}/>
            <Divider/>
            <NameWithValue title={"ИНН :"} value={supplierINN}/>
            <Divider/>
            <NameWithValue title={"Сумма :"} value={invoice.amount + " руб."}/>
            <Divider/>
            <NameWithValue title={"НДС :"} value={invoice.isWithVAT ? "Да" : "Нет"}/>
            <Divider/>
            <NameWithValue title={"Одобрен :"}>
                <ApprovedInvoiceCheckbox invoice={invoice}/>
            </NameWithValue>
        </Stack>
    );
};

export default InvoiceDetailsInfo;