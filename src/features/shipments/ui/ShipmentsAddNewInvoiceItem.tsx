import React, { FC, useId } from "react";
import { IInvoice } from "models/iInvoices";
import {
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { convertMillisecondsToDate, deleteYearFromString, extractAllText } from "utils/services";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppSelector } from "hooks/redux";
import { getSupplierNameById } from "store/selectors/suppliers";
import { IShipmentsInvoice, TShipmentInvoiceValue } from "models/iShipments";
import { invoiceValues } from "features/shipments/ui/ShipmentsAddNew";
import { DOWNLOAD_TEXT } from "utils/const";
import { COMPONENT_A, PRIMARY, SUCCESS } from "styles/const";

interface IProps {
  invoice: IInvoice;
  selectedInvoices: IShipmentsInvoice[];
  handleChangeSelectedInvoices: (invoiceId: string) => void;
  handleValueChange: (invoiceId: string, newValue: TShipmentInvoiceValue) => void;
}

const ShipmentsAddNewInvoiceItem: FC<IProps> = ({
  invoice,
  selectedInvoices,
  handleChangeSelectedInvoices,
  handleValueChange,
}) => {
  const currentSelected = selectedInvoices.find((selectedInvoice) => selectedInvoice.invoiceId === invoice.id);
  const matches_900 = useMediaQuery("(min-width:900px)");
  const matches_800 = useMediaQuery("(min-width:800px)");
  const matches_600 = useMediaQuery("(min-width:600px)");
  const matches_500 = useMediaQuery("(min-width:500px)");
  const isSelected = currentSelected !== undefined;
  const checkboxId = useId();
  const selectId = useId();
  const handleInvoiceChange = () => {
    handleChangeSelectedInvoices(invoice.id);
  };
  const handleInvoiceValueChange = (e: SelectChangeEvent) => {
    handleValueChange(invoice.id, e.target.value as TShipmentInvoiceValue);
  };
  const supplierName = useAppSelector((state) => getSupplierNameById(state, invoice.supplierId));
  const dateCreated = convertMillisecondsToDate(invoice.author.date);
  const valueList = invoiceValues.map((value) => (
    <MenuItem key={value.value} value={value.value}>
      {value.title}
    </MenuItem>
  ));
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align={"center"} sx={{ padding: matches_900 ? "16px" : 0 }}>
        <Checkbox
          checked={isSelected}
          onChange={handleInvoiceChange}
          id={checkboxId}
          inputProps={{ "aria-label": "controlled" }}
          sx={{ "& .MuiSvgIcon-root": { fontSize: matches_600 ? 38 : 22 } }}
        />
      </TableCell>
      {matches_600 && (
        <TableCell
          sx={{
            color: "black",
            padding: matches_900 ? "16px" : "4px",
          }}
        >
          {matches_800 ? dateCreated : deleteYearFromString(dateCreated)}
        </TableCell>
      )}
      <TableCell
        sx={{ color: "black", padding: matches_900 ? "16px" : "4px", fontSize: matches_500 ? "16px" : "12px" }}
      >
        {matches_800 ? supplierName : extractAllText(supplierName)}
      </TableCell>
      <TableCell sx={{ cursor: "pointer", padding: matches_900 ? "16px" : "4px" }} align={"right"}>
        <Typography sx={{ color: "black", fontSize: matches_500 ? "16px" : "12px" }}>
          {new Intl.NumberFormat("ru-RU").format(invoice.amount)} {matches_600 ? " руб." : ""}
        </Typography>
      </TableCell>
      {matches_900 && (
        <TableCell sx={{ color: "black", padding: matches_900 ? "16px" : "4px" }} align={"center"}>
          {invoice.paid.isPaid ? (
            convertMillisecondsToDate(invoice.paid.date)
          ) : (
            <Typography
              color={invoice.cancel && invoice.cancel.isCancel ? "#FF0033" : "black"}
              fontWeight={invoice.cancel && invoice.cancel.isCancel ? 600 : 400}
            >
              {invoice.cancel && invoice.cancel.isCancel ? "Отменён" : "Нет"}
            </Typography>
          )}
        </TableCell>
      )}
      <TableCell sx={{ color: "black", padding: matches_900 ? "16px" : 0 }} align="center">
        {isSelected ? (
          <FormControl fullWidth sx={{ width: "100%" }}>
            <Select
              id={selectId}
              defaultValue={""}
              value={currentSelected.volume}
              onChange={handleInvoiceValueChange}
              sx={{ overflow: "hidden" }}
            >
              {valueList}
            </Select>
          </FormControl>
        ) : (
          <>
            {matches_900 ? (
              <Chip
                label={DOWNLOAD_TEXT}
                component={COMPONENT_A}
                href={invoice.invoiceFileLink}
                icon={<DownloadIcon />}
                color={SUCCESS}
                clickable
              />
            ) : (
              <IconButton
                color={PRIMARY}
                aria-label="download invoice"
                component={COMPONENT_A}
                href={invoice.invoiceFileLink}
              >
                <DownloadIcon />
              </IconButton>
            )}
          </>
        )}
      </TableCell>
      {matches_500 && (
        <TableCell sx={{ padding: matches_900 ? "16px" : 0 }}>
          <IconButton aria-label="add to shopping cart">
            <MoreVertIcon color="success" />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

export default ShipmentsAddNewInvoiceItem;
