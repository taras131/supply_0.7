import React from "react";
import { TableHead, TableRow, useMediaQuery } from "@mui/material";
import { CENTER, LEFT, StyledTableCell } from "../../../styles/const";

const MachineryListTableHeader = () => {
  const matches_700 = useMediaQuery("(min-width:700px)");
  const matches_600 = useMediaQuery("(min-width:600px)");
  const matches_500 = useMediaQuery("(min-width:500px)");
  const matches_450 = useMediaQuery("(min-width:450px)");
  return (
    <TableHead>
      <TableRow sx={{ padding: matches_700 ? "10px" : "2px" }}>
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "2px" }} align={CENTER}>
          Фото
        </StyledTableCell>
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "2px" }} align={LEFT}>
          Марка
        </StyledTableCell>
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "2px" }} align={LEFT}>
          Модель
        </StyledTableCell>
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "2px" }} align={CENTER}>
          VIN
        </StyledTableCell>
        {matches_500 && (
          <StyledTableCell sx={{ padding: matches_700 ? "8px" : "2px" }} align={CENTER}>
            Год
          </StyledTableCell>
        )}
        {matches_450 && (
          <StyledTableCell sx={{ padding: matches_700 ? "8px" : "2px" }} align={CENTER}>
            {matches_600 ? "Номер" : "Ном"}
          </StyledTableCell>
        )}
        {matches_700 && (
          <StyledTableCell sx={{ padding: matches_700 ? "8px" : "2px" }} align={CENTER}>
            Заметки
          </StyledTableCell>
        )}
        <StyledTableCell sx={{ padding: matches_700 ? "8px" : "2px" }} align={CENTER}>
          {matches_500 && "Ещё"}
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default MachineryListTableHeader;
