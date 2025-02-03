import React, {ChangeEvent, FC, useId, useMemo} from "react";
import {IMachinery, INewMachinery} from "../../../models/iMachinery";
import TextField from "@mui/material/TextField";
import {FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {machineryTypes} from "../model/slice";
import {yearsManufacture} from "../../../utils/const";

interface IProps {
    editedMachinery: IMachinery | INewMachinery | null;
    machineryFieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent) => void
}

const MachineryEdit: FC<IProps> = ({editedMachinery, machineryFieldChangeHandler}) => {
    const selectTypeId = useId();
    const selectYearId = useId();
    const typeList = useMemo(
        () =>
            machineryTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                    {type.title}
                </MenuItem>
            )),
        []
    );
    const yearManufactureList = useMemo(
        () =>
            yearsManufacture.map((year) => (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            )),
        []
    );
    if (!editedMachinery) return null;
    return (
        <>
            <FormControl fullWidth>
                <Select
                    variant="outlined"
                    id={selectTypeId}
                    value={`${editedMachinery.type_id}`}
                    onChange={machineryFieldChangeHandler}
                    sx={{overflow: "hidden"}}
                    fullWidth
                    name={"type_id"}
                >
                    {typeList}
                </Select>
            </FormControl>
            <TextField id="outlined-basic"
                       label="Марка"
                       variant="outlined"
                       name="brand"
                       onChange={machineryFieldChangeHandler}
                       value={editedMachinery.brand}/>
            <TextField id="outlined-basic"
                       label="Модель"
                       variant="outlined"
                       name="model"
                       onChange={machineryFieldChangeHandler}
                       value={editedMachinery.model}/>

            <TextField id="outlined-basic"
                       label="VIN"
                       variant="outlined"
                       name="vin"
                       onChange={machineryFieldChangeHandler}
                       value={editedMachinery.vin}/>
            <TextField id="outlined-basic"
                       label="Гос. номер:"
                       variant="outlined"
                       name="state_number"
                       onChange={machineryFieldChangeHandler}
                       value={editedMachinery.state_number}/>
            <FormControl fullWidth>
                <Select
                    variant="outlined"
                    id={selectYearId}
                    value={`${editedMachinery.year_manufacture}`}
                    onChange={machineryFieldChangeHandler}
                    sx={{overflow: "hidden"}}
                    fullWidth
                    name="year_manufacture"
                >
                    {yearManufactureList}
                </Select>
                <FormHelperText>Год выпуска</FormHelperText>
            </FormControl>
        </>
    );
};

export default MachineryEdit;