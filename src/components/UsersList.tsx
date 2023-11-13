import React, {FC} from "react";
import {TableBody} from "@mui/material";
import User from "./User";
import {IUser} from "../models/iAuth";

interface IProps {
    users: IUser[]
}
const UsersList:FC<IProps> = ({users}) => {
    const allUsersList = users.map(user => (<User key={user.id} {...user}/>));
    return (
        <TableBody>
            {allUsersList}
        </TableBody>
    );
};

export default UsersList;