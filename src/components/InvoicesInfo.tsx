import React from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getAmountUnpaidInvoices, getCountUnpaidInvoices} from "../store/selectors/invoices";

const InvoicesInfo = () => {
    const countUnpaidInvoices = useAppSelector(state => getCountUnpaidInvoices(state))
    const amountUnpaidInvoices = useAppSelector(state => getAmountUnpaidInvoices(state))
    return (
        <Stack sx={{maxWidth: 1350, width: "100%"}} direction="row" alignItems="center"
               justifyContent="space-between">
            <Stack direction="row" spacing={1}>
                <Typography color={"gray"}>Всего неоплаченных счетов:</Typography>
                <Typography color={"darkblue"} fontSize="16px" fontWeight={600}>{countUnpaidInvoices}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Typography color={"gray"}>На сумму:</Typography>
                <Typography color={"darkblue"} fontSize="16px" fontWeight={600}>
                    {new Intl.NumberFormat('ru-RU').format(amountUnpaidInvoices)} руб.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default InvoicesInfo;