import React, {FC} from "react";
import {ISupplier} from "../models/iSuppliers";
import {TableCell, TableRow, useMediaQuery} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getAmountBySupplierId} from "../store/selectors/invoices";

const Supplier: FC<ISupplier> = ({id, name, INN}) => {
    const matches_500 = useMediaQuery("(min-width:500px)");
    const amountPaidInvoice = useAppSelector(state => getAmountBySupplierId(state, id));
    return (
        <TableRow
            key={id}
            sx={{"&:last-child td, &:last-child th": {border: 0}}}
        >
            <TableCell component="th" scope="row" sx={{padding: matches_500 ? "12px" : "4px"}}>
                {name}
            </TableCell>
            <TableCell align="right" sx={{padding: matches_500 ? "12px" : "4px"}}>{INN}</TableCell>
            <TableCell align="right" sx={{padding: matches_500 ? "12px" : "4px"}}>
                {new Intl.NumberFormat("ru-RU").format(amountPaidInvoice)} руб.
            </TableCell>
        </TableRow>
    );
};

export default Supplier;