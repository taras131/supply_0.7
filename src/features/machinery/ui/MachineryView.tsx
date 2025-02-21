import React, {ChangeEvent, FC, useMemo} from "react";
import {IMachinery, INewMachinery} from "../../../models/iMachinery";
import {
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import {yearsManufacture} from "../../../utils/const";
import {engineTypes, machineryTypes, tractionTypes, transmissionTypes} from "../utils/const";
import Card from "@mui/material/Card";
import FieldControl from "../../../components/common/FieldControl";

const STYLES = {
    stack: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        justifyItems: "center",
        marginTop: "24px",
        "& > *": {
            minWidth: "280px",
            width: "100%",
            maxWidth: "420px",
        },
    },
};

interface IProps {
    editedMachinery: IMachinery | INewMachinery | null;
    isEditMode?: boolean;
    machineryFieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void
}

const MachineryView: FC<IProps> = ({editedMachinery, isEditMode = false, machineryFieldChangeHandler}) => {
    const yearOptions = useMemo(() => yearsManufacture.map(year => ({ id: year, title: year })), []);
    if (!editedMachinery) return null;
    return (
        <>
            <Card sx={{padding: "24px", flexGrow: 1}}>
                <Typography variant="h5" color="primary">
                    Основные сведения:
                </Typography>
                <Stack spacing={3} sx={STYLES.stack}>
                    <FieldControl
                        label="Тип техники"
                        name="type_id"
                        id="type_id"
                        value={editedMachinery.type_id}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        options={machineryTypes}
                        isRequired
                    />
                    <FieldControl
                        label="Тип двигателя"
                        name="engine_type_id"
                        id="engine_type_id"
                        value={editedMachinery.engine_type_id}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        options={engineTypes}
                        isRequired
                    />
                    <FieldControl
                        label="Год производства"
                        name="year_manufacture"
                        id="year_manufacture"
                        value={`${editedMachinery.year_manufacture}`}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        options={yearOptions}
                        isRequired
                    />
                    <FieldControl
                        label="Марка"
                        name="brand"
                        id="brand"
                        value={editedMachinery.brand}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        isRequired
                    />
                    <FieldControl
                        label="Модель"
                        name="model"
                        id="model"
                        value={editedMachinery.model}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        isRequired
                    />
                    <FieldControl
                        label="VIN"
                        name="vin"
                        id="vin"
                        value={editedMachinery.vin}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    <FieldControl
                        label="Гос. номер"
                        name="state_number"
                        id="state_number"
                        value={editedMachinery.state_number}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                </Stack>
            </Card>
            <Card sx={{padding: "24px", flexGrow: 1}}>
                <Typography variant="h5" color="primary">
                    Дополнительные сведения:
                </Typography>
                <Stack spacing={3} sx={STYLES.stack}>
                    <FieldControl
                        label="Тип движетеля"
                        name="traction_type_id"
                        id="traction_type_id"
                        value={editedMachinery.traction_type_id}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        options={tractionTypes}
                    />
                    <FieldControl
                        label="Тип трансмисии"
                        name="transmission_type_id"
                        id="transmission_type_id"
                        value={editedMachinery.transmission_type_id}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        options={transmissionTypes}
                    />
                    <FieldControl
                        label="Марка двигателя"
                        name="engine_brand"
                        id="engine_brand"
                        value={editedMachinery.engine_brand}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    <FieldControl
                        label="Модель двигателя"
                        name="engine_model"
                        id="engine_model"
                        value={editedMachinery.engine_model}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    <FieldControl
                        label="Марка трансмиссии"
                        name="transmission_brand"
                        id="transmission_brand"
                        value={editedMachinery.transmission_brand}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    <FieldControl
                        label="Модель трансмиссии"
                        name="transmission_model"
                        id="transmission_model"
                        value={editedMachinery.transmission_model}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                </Stack>
            </Card>
        </>
    );
};

export default MachineryView;