import React, { FC } from "react";
import { ISupplier } from "models/iSuppliers";
import { TableCell, TableRow, useMediaQuery } from "@mui/material";
import { useAppSelector } from "hooks/redux";
import { useNavigate } from "react-router-dom";
import { routes } from "utils/routes";
import {getAmountBySupplierId} from "features/invoices/model/selectors";

const Supplier: FC<ISupplier> = ({ id, name, INN }) => {
  const matches_500 = useMediaQuery("(min-width:500px)");
  const navigate = useNavigate();
  const amountPaidInvoice = useAppSelector((state) => getAmountBySupplierId(state, id));
  const handleClick = () => {
    navigate(`${routes.invoices}?supplierFilter=${id}`);
  };
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
      onClick={handleClick}
    >
      <TableCell component="th" scope="row" sx={{ padding: matches_500 ? "12px" : "4px" }}>
        {name}
      </TableCell>
      <TableCell align="right" sx={{ padding: matches_500 ? "12px" : "4px" }}>
        {INN}
      </TableCell>
      <TableCell align="right" sx={{ padding: matches_500 ? "12px" : "4px" }}>
        {new Intl.NumberFormat("ru-RU").format(amountPaidInvoice)} руб.
      </TableCell>
    </TableRow>
  );
};

export default Supplier;
