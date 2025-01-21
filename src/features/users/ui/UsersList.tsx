import React, { FC } from "react";
import { TableBody } from "@mui/material";
import UserListItem from "./UserListItem";
import {IUser} from "../../../models/IUser";

interface IProps {
  users: IUser[];
}
const UsersList: FC<IProps> = ({ users }) => {
  const allUsersList = users.map((user) => <UserListItem key={user.id} user={user} />);
  return <TableBody>{allUsersList}</TableBody>;
};

export default UsersList;
