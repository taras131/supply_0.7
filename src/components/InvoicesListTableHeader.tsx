import React from "react";
import { TableCell, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";

const InvoicesListTableHeader = () => {
  const matches_1300 = useMediaQuery("(min-width:1300px)");
  const matches_1050 = useMediaQuery("(min-width:1050px)");
  const matches_700 = useMediaQuery("(min-width:700px)");
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ padding: "2px" }} align={"center"}>
          <Typography fontSize="14px" fontWeight={600}>
            {matches_700 ? "Одобрен" : "Од."}
          </Typography>
        </TableCell>
        <TableCell sx={{ padding: matches_1050 ? "16px" : "3px" }}>
          <Typography fontSize="14px" fontWeight={600}>
            Дата
          </Typography>
        </TableCell>
        <TableCell>
          <Typography fontSize="14px" fontWeight={600}>
            Поставщик
          </Typography>
        </TableCell>
        {matches_1050 && (
          <TableCell align={"center"}>
            <Typography fontSize="14px" fontWeight={600}>
              ИНН
            </Typography>
          </TableCell>
        )}
        <TableCell align={"center"}>
          <Typography fontSize="14px" fontWeight={600}>
            Сумма
          </Typography>
        </TableCell>
        {matches_1300 && (
          <TableCell align={"center"}>
            <Typography fontSize="14px" fontWeight={600}>
              НДС
            </Typography>
          </TableCell>
        )}
        {matches_1050 && (
          <TableCell>
            <Typography fontSize="14px" fontWeight={600}>
              Оплачен
            </Typography>
          </TableCell>
        )}
        <TableCell align="center" sx={{ padding: matches_700 ? "16px" : 0 }}>
          <Typography fontSize="14px" fontWeight={600}>
            Счёт
          </Typography>
        </TableCell>
        {matches_1300 && (
          <>
            <TableCell align="center" sx={{ maxWidth: 90, padding: "4px" }}>
              <Typography fontSize="14px" fontWeight={600} lineHeight={1}>
                Платёжное поручение
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography fontSize="14px" fontWeight={600}></Typography>
            </TableCell>
          </>
        )}
        <TableCell align="center" sx={{ padding: "3px" }}>
          <Typography fontSize="14px" fontWeight={600}>
            Ещё
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default InvoicesListTableHeader;
