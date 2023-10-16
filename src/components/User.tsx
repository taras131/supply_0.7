import React, {FC} from 'react';
import {TableCell, TableRow} from "@mui/material";
import {IUser} from "../models/iAuth";

const User: FC<IUser> = ({id, uid, email, firstName, middleName, role}) => {
    return (
        <TableRow
            key={id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row" align="left">
                {firstName}
            </TableCell>
            <TableCell align="left">{middleName}</TableCell>
            <TableCell align="left">
                {email}
            </TableCell>
            <TableCell align="left">
                {role}
            </TableCell>
        </TableRow>
    );
};

export default User;