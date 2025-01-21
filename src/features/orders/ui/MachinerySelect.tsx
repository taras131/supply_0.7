import React, {FC, useId} from "react";
import {FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAppSelector} from "hooks/redux";
import {getMachinery} from "features/machinery/model/selectors";

interface IProps {
    machineryId: string
    label?: string
    handleMachineryChange: (e: SelectChangeEvent<string>) => void
}

const MachinerySelect: FC<IProps> = ({machineryId, label, handleMachineryChange}) => {
    const machinery = useAppSelector((state) => getMachinery(state));
    const selectMachineryId = useId();
    const machineryMenuList = machinery.map((machinery) => (
        <MenuItem key={machinery.id} value={machinery.id}>
            {`${machinery.brand} ${machinery.model} ${machinery.vin} ${machinery.yearManufacture}`}
        </MenuItem>
    ));
    return (
        <FormControl sx={{ width: "250px" }}>
            <Select
                id={selectMachineryId}
                defaultValue={"Нет"}
                value={machineryId}
                onChange={handleMachineryChange}
                sx={{ overflow: "hidden" }}
            >
                <MenuItem key={"empty"} value={"empty"}>
                    Нет
                </MenuItem>
                {machineryMenuList}
            </Select>
            {label && (<FormHelperText>{label}</FormHelperText>)}
        </FormControl>
    );
};

export default MachinerySelect;