import React from "react";
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
import Supplier from "../components/Supplier";
import SuppliersHeader from "../components/SuppliersHeader";
import { selectSuppliers } from "store/reducers/suppliers";
import { useAppSelector } from "hooks/redux";

const Suppliers = () => {
  const suppliers = useAppSelector(selectSuppliers);
  const suppliersList = suppliers.map((supplier) => <Supplier key={supplier.id} {...supplier} />);
  return (
    <Stack spacing={4} pt={3} alignItems="center">
      <SuppliersHeader />
      <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontSize="18px" fontWeight={600}>
                  Поставщик
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontSize="18px" fontWeight={600}>
                  ИНН
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontSize="18px" fontWeight={600}>
                  Оборот
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{suppliersList}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Suppliers;
