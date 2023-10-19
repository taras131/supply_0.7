import React from "react";
import {useAppSelector} from "../hooks/redux";
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {getAllUsers} from "../store/selectors/auth";
import User from "../components/User";

const Users = () => {
    const allUsers = useAppSelector(state => getAllUsers(state));
    const allUsersList = allUsers.map(user => (<User key={user.id} {...user}/>));
    return (
        <Stack style={{minHeight: "calc(100vh - 60px"}} alignItems="center">
            <TableContainer component={Paper} sx={{maxWidth: 850}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Typography fontSize="18px" fontWeight={600}>
                                    Имя
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography fontSize="18px" fontWeight={600}>
                                    Отчество
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography fontSize="18px" fontWeight={600}>
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography fontSize="18px" fontWeight={600}>
                                    Должность
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsersList}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>);
};

export default Users;