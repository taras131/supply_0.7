import React, {FC, useMemo, useState} from "react";
import Card from "@mui/material/Card";
import {IMachinery} from "../../../models/iMachinery";
import {Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from "@mui/material";
import MachineryTableRow from "./MachineryTableRow";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

interface IProps {
    rows?: IMachinery[];
}

const MachineryTable: FC<IProps> = ({rows = []}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedRows = useMemo(() => {
        const start = page * rowsPerPage;
        return rows.slice(start, start + rowsPerPage);
    }, [rows, page, rowsPerPage]);

    const rowsList = paginatedRows.map(row => (
        <MachineryTableRow key={row.id} row={row}/>
    ));

    return (
        <Card>
            <Box sx={{overflowX: "auto"}}>
                <Table sx={{minWidth: "800px"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Фото</TableCell>
                            <TableCell>Марка</TableCell>
                            <TableCell>Модель</TableCell>
                            <TableCell>Год выпуска</TableCell>
                            <TableCell>Номер</TableCell>
                            <TableCell>VIN</TableCell>
                            <TableCell>Категория</TableCell>
                            <TableCell>Ещё</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsList}
                    </TableBody>
                </Table>
            </Box>
            <Divider/>
            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

export default MachineryTable;