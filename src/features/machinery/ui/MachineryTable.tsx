import React, {FC} from "react";
import Card from "@mui/material/Card";
import {IMachinery} from "../../../models/iMachinery";
import {Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from "@mui/material";
import MachineryTableRow from "./MachineryTableRow";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function noop(): void {
    // do nothing
}

interface IProps {
    count?: number;
    page?: number;
    rows?: IMachinery[];
    rowsPerPage?: number;
}

const MachineryTable: FC<IProps> = ({
                                        count = 0,
                                        rows = [],
                                        page = 0,
                                        rowsPerPage = 0,
                                    }) => {
    const rowsList = rows.map((row) => (<MachineryTableRow key={row.id} row={row}/>));
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
                count={count}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

export default MachineryTable;