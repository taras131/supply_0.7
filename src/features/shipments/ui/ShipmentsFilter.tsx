import React from "react";
import Stack from "@mui/material/Stack";
import { CENTER, COLUMN, ROW, SPACE_BETWEEN } from "styles/const";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, useMediaQuery } from "@mui/material";
import { ALL, shipmentTypes, transporters } from "utils/const";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  setShipmentSearch,
  setShipmentTypeFilter,
  setTransporterFilter,
} from "features/shipments/model/slice";
import { Transporter, TShipmentsType } from "models/iShipments";
import {
  selectShipmentSearch,
  selectShipmentTypeFilter,
  selectTransporterFilter,
} from "features/shipments/model/selectors";

const ShipmentsFilter = () => {
  const dispatch = useAppDispatch();
  const matches_700 = useMediaQuery("(min-width:700px)");
  const transporterFilter = useAppSelector(selectTransporterFilter);
  const shipmentTypeFilter = useAppSelector(selectShipmentTypeFilter);
  const search = useAppSelector(selectShipmentSearch);
  const handleTransporterChange = (event: SelectChangeEvent) => {
    dispatch(setTransporterFilter(event.target.value as Transporter | typeof ALL));
  };
  const handleShipmentTypeChange = (event: SelectChangeEvent) => {
    dispatch(setShipmentTypeFilter(event.target.value as TShipmentsType | typeof ALL));
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShipmentSearch(event.target.value as string));
  };
  const transporterMenuItems = transporters.map((transporterName) => (
    <MenuItem key={transporterName} value={transporterName}>
      {transporterName}
    </MenuItem>
  ));
  const shipmentTypesMenuItems = shipmentTypes.map((shipmentType) => (
    <MenuItem key={shipmentType.name} value={shipmentType.name}>
      {shipmentType.value}
    </MenuItem>
  ));
  return (
    <Stack
      sx={{ maxWidth: "1350px", width: "100%" }}
      spacing={2}
      direction={matches_700 ? ROW : COLUMN}
      alignItems={CENTER}
      justifyContent={matches_700 ? SPACE_BETWEEN : CENTER}
    >
      <FormControl fullWidth size={matches_700 ? "medium" : "small"}>
        <InputLabel id="transporterLabel">Перевозчик</InputLabel>
        <Select
          id="transporterLabel"
          labelId={"transporterLabel"}
          value={transporterFilter}
          label={"Перевозчик"}
          onChange={handleTransporterChange}
        >
          <MenuItem value={ALL}>Все</MenuItem>
          {transporterMenuItems}
        </Select>
      </FormControl>
      <FormControl fullWidth size={matches_700 ? "medium" : "small"}>
        <InputLabel id="shipmentTypeLabel">Тип</InputLabel>
        <Select
          id={"shipmentType"}
          labelId={"shipmentTypeLabel"}
          value={shipmentTypeFilter}
          label={"Тип"}
          onChange={handleShipmentTypeChange}
        >
          <MenuItem value={ALL}>Все</MenuItem>
          {shipmentTypesMenuItems}
        </Select>
      </FormControl>
      <FormControl fullWidth size={matches_700 ? "medium" : "small"}>
        <TextField value={search} onChange={handleSearchChange} label={"Номер накладной"} />
      </FormControl>
    </Stack>
  );
};

export default ShipmentsFilter;
