import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import {
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UsersList from "./UsersList";
import {getAllUsers} from "../model/selectors";
import Preloader from "../../../components/Preloader";

const Users = () => {
  const users = useAppSelector(getAllUsers);
  if(users.length === 0) {
    return (<Preloader/>);
  }
  const matches_650 = useMediaQuery("(min-width:500px)");
  const matches_550 = useMediaQuery("(min-width:550px)");
  return (
    <Stack style={{ minHeight: "calc(100vh - 60px" }} alignItems="center">
      <TableContainer component={Paper} sx={{ maxWidth: 850 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ padding: matches_650 ? "12px" : "4px" }}>
                <Typography fontSize={matches_650 ? "18px" : "14px"} fontWeight={600}>
                  {matches_550 ? "Имя" : "ФИО"}
                </Typography>
              </TableCell>
              {matches_550 && (
                <TableCell align="left" sx={{ padding: matches_650 ? "12px" : "4px" }}>
                  <Typography fontSize={matches_650 ? "18px" : "14px"} fontWeight={600}>
                    Отчество
                  </Typography>
                </TableCell>
              )}
              <TableCell align="left" sx={{ padding: matches_650 ? "12px" : "4px" }}>
                <Typography fontSize={matches_650 ? "18px" : "14px"} fontWeight={600}>
                  Email
                </Typography>
              </TableCell>
              <TableCell align="left" sx={{ padding: matches_650 ? "12px" : "4px" }}>
                <Typography fontSize={matches_650 ? "18px" : "14px"} fontWeight={600}>
                  Должность
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <UsersList users={users} />
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Users;
