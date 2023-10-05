import React from 'react';
import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import InvoicesHeader from "../components/InvoicesHeader";

const Invoices = () => {
    return (
        <Stack style={{minHeight: "calc(100vh - 60px"}} alignItems="center">
            <InvoicesHeader/>
            <TableContainer component={Paper} sx={{maxWidth: 850}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Поставщик</TableCell>
                            <TableCell align="right">ИНН</TableCell>
                            <TableCell align="right">id</TableCell>
                            <TableCell align="right">Оборот</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        empty
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default Invoices;