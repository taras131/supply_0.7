import React, {FC} from 'react';
import {ISuppliers} from "../models/iSuppliers";
import {TableCell, TableRow} from "@mui/material";

const Supplier:FC<ISuppliers> = ({id, name, INN}) => {
    return (
        <TableRow
            key={id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell align="right">{INN}</TableCell>
            <TableCell align="right">{id}</TableCell>
            <TableCell align="right">{101234}</TableCell>
        </TableRow>
    );
};

export default Supplier;