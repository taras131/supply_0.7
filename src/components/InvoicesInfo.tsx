import React from "react";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getAmountUnpaidInvoices, getCountUnpaidInvoices} from "../store/selectors/invoices";
import {CENTER, COLUMN, ROW, SPACE_BETWEEN, START} from "../styles/const";

const InvoicesInfo = () => {
    const matches_500 = useMediaQuery("(min-width:500px)");
    const matches_400 = useMediaQuery("(min-width:400px)");
    const countUnpaidInvoices = useAppSelector(state => getCountUnpaidInvoices(state));
    const amountUnpaidInvoices = useAppSelector(state => getAmountUnpaidInvoices(state));
    return (
        <Stack sx={{width: "100%", maxWidth: 1350}}
               direction={matches_400 ? ROW : COLUMN}
               alignItems={matches_400 ? CENTER : START}
               justifyContent={START}
               spacing={matches_400 ? 2 : 1}>
            <Stack direction={ROW} spacing={1}>
                <Typography color={"gray"}
                            fontSize={matches_500 ? "16px" : "12px"}
                            fontWeight={matches_500 ? 600 : 500}>
                    Неоплаченных счетов:
                </Typography>
                <Typography color={"darkblue"}
                            fontSize={matches_500 ? "16px" : "12px"}
                            fontWeight={matches_500 ? 600 : 500}>
                    {countUnpaidInvoices}
                </Typography>
            </Stack>
            <Stack direction={ROW} spacing={1}>
                <Typography color={"gray"}
                            fontSize={matches_500 ? "16px" : "12px"}
                            fontWeight={matches_500 ? 600 : 500}>
                    На сумму:
                </Typography>
                <Typography color={"darkblue"}
                            fontSize={matches_500 ? "16px" : "12px"}
                            fontWeight={matches_500 ? 600 : 500}>
                    {new Intl.NumberFormat("ru-RU").format(amountUnpaidInvoices)} руб.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default InvoicesInfo;