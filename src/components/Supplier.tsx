import React, {FC} from "react";
import {ISupplier} from "../models/iSuppliers";
import {TableCell, TableRow} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getAmountBySupplierId} from "../store/selectors/invoices";

const Supplier: FC<ISupplier> = ({id, name, INN}) => {
    const amountPaidInvoice = useAppSelector(state => getAmountBySupplierId(state, id));
    return (
        <TableRow
            key={id}
            sx={{"&:last-child td, &:last-child th": {border: 0}}}
        >
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell align="right">{INN}</TableCell>
            <TableCell align="right">
                {new Intl.NumberFormat("ru-RU").format(amountPaidInvoice)} руб.
            </TableCell>
        </TableRow>
    );
};

export default Supplier;