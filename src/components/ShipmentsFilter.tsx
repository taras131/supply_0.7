import React, {FC, useId} from 'react';
import Stack from "@mui/material/Stack";
import {CENTER, COLUMN, ROW, SPACE_BETWEEN} from "../styles/const";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useMediaQuery} from "@mui/material";
import {ALL} from "../utils/const";
import {transporters} from "../pages/ShipmentsAddNew";

interface IProps {
    transporterFilter: string
    setTransportersFilter: (value: string) => void
}

const ShipmentsFilter:FC<IProps> = ({transporterFilter,setTransportersFilter}) => {
    const selectTransporterId = useId();
    const labelTransporterId = useId();
    const matches_700 = useMediaQuery("(min-width:700px)");
    const handleTransporterChange = (event: SelectChangeEvent) => {
        setTransportersFilter(event.target.value as string)
    }
    const transporterMenuItems = transporters.map(transporterName => (<MenuItem key={transporterName} value={transporterName}>
        {transporterName}
    </MenuItem>))
    return (
        <Stack sx={{maxWidth: "1350px",width: "100%"}}
               direction={matches_700 ? ROW : COLUMN}
               alignItems={CENTER}
               justifyContent={matches_700 ? SPACE_BETWEEN : CENTER}>
            <FormControl fullWidth size={matches_700 ? "medium" : "small"}>
                <InputLabel id={labelTransporterId}>Перевозчик</InputLabel>
                <Select
                    id={selectTransporterId}
                    labelId={labelTransporterId}
                    value={transporterFilter}
                    label={"Перевозчик"}
                    onChange={handleTransporterChange}
                >
                    <MenuItem value={ALL}>Все</MenuItem>
                    {transporterMenuItems}
                </Select>
            </FormControl>
        </Stack>
    );
};

export default ShipmentsFilter;