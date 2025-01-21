import React, { FC } from "react";
import { TableCell, TableRow, useMediaQuery } from "@mui/material";
import {IUser} from "../../../models/IUser";
import {userRoles} from "../model/slice";

interface IProps {
    user: IUser;
}

const UserListItem: FC<IProps> = ({user }) => {
  const matches_650 = useMediaQuery("(min-width:500px)");
  const matches_550 = useMediaQuery("(min-width:550px)");
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell sx={{ padding: matches_650 ? "12px" : "4px" }} component="th" scope="row" align="left">
        {matches_550 ? user.first_name : `${user.first_name} ${user.middle_name}`}
      </TableCell>
      {matches_550 && (
        <TableCell sx={{ padding: matches_650 ? "12px" : "4px" }} align="left">
          {user.middle_name}
        </TableCell>
      )}
      <TableCell sx={{ padding: matches_650 ? "12px" : "4px" }} align="left">
        {user.email}
      </TableCell>
      <TableCell sx={{ padding: matches_650 ? "12px" : "4px" }} align="left">
        {userRoles[user.role_id].title}
      </TableCell>
    </TableRow>
  );
};

export default UserListItem;
