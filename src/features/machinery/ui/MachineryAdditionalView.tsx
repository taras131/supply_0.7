import React, {ChangeEvent, FC} from "react";
import {IMachinery, INewMachinery} from "../../../models/iMachinery";
import {
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import {tractionTypes, transmissionTypes} from "../utils/const";
import Card from "@mui/material/Card";
import FieldControl from "../../../components/common/FieldControl";
import {ValidationErrors} from "../../../utils/validators";
import {convertMillisecondsToDate} from "../../../utils/services";

export const STYLES = {
    stack: (isEditMode: boolean) => ({
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${isEditMode ? 280 : 180}px, 1fr))`,
        gap: "24px",
        justifyItems: "center",
        marginTop: "24px",
        "& > *": {
            minWidth: isEditMode ? "280px" : "180px",
            width: "100%",
            maxWidth: "420px",
        },
    }),
};

interface IProps {
    editedMachinery: IMachinery | INewMachinery | null;
    errors?: ValidationErrors;
    isEditMode?: boolean;
    machineryFieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void
}

const MachineryAdditionalView: FC<IProps> = ({editedMachinery, errors, isEditMode = false, machineryFieldChangeHandler}) => {
    if (!editedMachinery) return null;
    return (
            <Card sx={{padding: "24px", flexGrow: 1}}>
                <Typography variant="h5" color="primary">
                    Дополнительные сведения:
                </Typography>
                <Stack spacing={2} sx={STYLES.stack(isEditMode)}>
                    <FieldControl
                        label="Тип движетеля"
                        name="traction_type_id"
                        id="traction_type_id"
                        value={editedMachinery.traction_type_id}
                        error={errors?.traction_type_id}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        options={tractionTypes}
                    />
                    <FieldControl
                        label="Номер шасси / рамы"
                        name="frame_number"
                        id="frame_number"
                        value={editedMachinery.frame_number}
                        error={errors?.frame_number}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    <FieldControl
                        label="Тип трансмисии"
                        name="transmission_type_id"
                        id="transmission_type_id"
                        value={editedMachinery.transmission_type_id}
                        error={errors?.transmission_type_id}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                        options={transmissionTypes}
                    />
                    <FieldControl
                        label="Марка двигателя"
                        name="engine_brand"
                        id="engine_brand"
                        value={editedMachinery.engine_brand}
                        error={errors?.engine_brand}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    <FieldControl
                        label="Модель двигателя"
                        name="engine_model"
                        id="engine_model"
                        value={editedMachinery.engine_model}
                        error={errors?.engine_model}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    <FieldControl
                        label="Марка трансмиссии"
                        name="transmission_brand"
                        id="transmission_brand"
                        value={editedMachinery.transmission_brand}
                        error={errors?.transmission_brand}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    <FieldControl
                        label="Модель трансмиссии"
                        name="transmission_model"
                        id="transmission_model"
                        value={editedMachinery.transmission_model}
                        error={errors?.transmission_model}
                        isEditMode={isEditMode}
                        onChange={machineryFieldChangeHandler}
                    />
                    {"created_date" in editedMachinery && "updated_date" in editedMachinery && !isEditMode && (<>
                        <FieldControl
                            label="Статус"
                            name="status"
                            id="status"
                            value={editedMachinery.status}
                            isEditMode={isEditMode}
                            onChange={machineryFieldChangeHandler}/>
                        <FieldControl
                            label="Добавлена"
                            name="created_date"
                            id="created_date"
                            value={convertMillisecondsToDate(editedMachinery.created_date)}
                            isEditMode={isEditMode}
                            onChange={machineryFieldChangeHandler}/>
                        <FieldControl
                            label="Обновлена"
                            name="updated_date"
                            id="updated_date"
                            value={convertMillisecondsToDate(editedMachinery.updated_date)}
                            isEditMode={isEditMode}
                            onChange={machineryFieldChangeHandler}/>

                    </>)}
                </Stack>
            </Card>
    );
};

export default MachineryAdditionalView;