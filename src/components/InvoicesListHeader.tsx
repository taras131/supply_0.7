import React from "react";
import {TableCell, TableHead, TableRow, Typography} from "@mui/material";

const InvoicesListHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Typography fontSize="14px" fontWeight={600}>
                        Одобрен
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontSize="14px" fontWeight={600}>
                        Дата
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontSize="14px" fontWeight={600}>
                        Поставщик
                    </Typography></TableCell>
                <TableCell align={"center"}>
                    <Typography fontSize="14px" fontWeight={600}>
                        ИНН
                    </Typography>
                </TableCell>
                <TableCell align={"center"}>
                    <Typography fontSize="14px" fontWeight={600}>
                        Сумма
                    </Typography>
                </TableCell>
                <TableCell align={"center"}>
                    <Typography fontSize="14px" fontWeight={600}>
                        НДС
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography fontSize="14px" fontWeight={600}>
                        Оплачен
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography fontSize="14px" fontWeight={600}>
                        Счёт
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography fontSize="14px" fontWeight={600}>
                        Платёжное поручение
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography fontSize="14px" fontWeight={600}>

                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography fontSize="14px" fontWeight={600}>
                        Ещё
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default InvoicesListHeader;