import React from "react";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getAmountUnpaidInvoices, getCountUnpaidInvoices} from "../store/selectors/invoices";
import {CENTER, COLUMN, ROW, SPACE_BETWEEN, START} from "../styles/const";

const InvoicesInfo = () => {
    const matches_500 = useMediaQuery("(min-width:500px)");
    const countUnpaidInvoices = useAppSelector(state => getCountUnpaidInvoices(state));
    const amountUnpaidInvoices = useAppSelector(state => getAmountUnpaidInvoices(state));
    return (
        <Stack sx={{maxWidth: 1350, width: "100%"}}
               direction={matches_500 ? ROW : COLUMN}
               alignItems={matches_500 ? CENTER : START}
               justifyContent={matches_500 ? SPACE_BETWEEN : START}
               spacing={2}>
            <Stack direction="row" spacing={1}>
                <Typography color={"gray"}>Всего неоплаченных счетов:</Typography>
                <Typography color={"darkblue"} fontSize="16px" fontWeight={600}>{countUnpaidInvoices}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Typography color={"gray"}>На сумму:</Typography>
                <Typography color={"darkblue"} fontSize="16px" fontWeight={600}>
                    {new Intl.NumberFormat("ru-RU").format(amountUnpaidInvoices)} руб.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default InvoicesInfo;