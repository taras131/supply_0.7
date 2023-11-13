import React, {FC} from "react";
import {TableCell, TableRow, useMediaQuery} from "@mui/material";
import {IUser} from "../models/iAuth";

const User: FC<IUser> = ({id, email, firstName, middleName, role}) => {
    const matches_650 = useMediaQuery("(min-width:500px)");
    const matches_550 = useMediaQuery("(min-width:550px)");
    return (
        <TableRow
            key={id}
            sx={{"&:last-child td, &:last-child th": {border: 0}}}
        >
            <TableCell sx={{padding: matches_650 ? "12px" : "4px"}} component="th" scope="row" align="left">
                {matches_550 ? firstName : `${firstName} ${middleName}`}
            </TableCell>
            {matches_550 && (
                <TableCell sx={{padding: matches_650 ? "12px" : "4px"}} align="left">{middleName}</TableCell>
            )}
            <TableCell sx={{padding: matches_650 ? "12px" : "4px"}} align="left">
                {email}
            </TableCell>
            <TableCell sx={{padding: matches_650 ? "12px" : "4px"}} align="left">
                {role}
            </TableCell>
        </TableRow>
    );
};

export default User;