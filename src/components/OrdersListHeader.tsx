import React from "react";
import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

const OrdersListHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography fontSize="14px" fontWeight={600}>
            Одобрена
          </Typography>
        </TableCell>
        <TableCell>
          <Typography fontSize="14px" fontWeight={600}>
            Дата
          </Typography>
        </TableCell>
        <TableCell>
          <Typography fontSize="14px" fontWeight={600}>
            Название заявки
          </Typography>
        </TableCell>
        <TableCell align={"left"}>
          <Typography fontSize="14px" fontWeight={600}>
            Автор
          </Typography>
        </TableCell>
        <TableCell align={"center"}>
          <Typography fontSize="14px" fontWeight={600}>
            Позиций
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography fontSize="14px" fontWeight={600}></Typography>
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

export default OrdersListHeader;
