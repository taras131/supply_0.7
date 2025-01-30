import React, {ChangeEvent, FC} from "react";
import {SelectChangeEvent, Stack} from "@mui/material";
import MachineryEdit from "./MachineryEdit";
import TitleWithValue from "../../../components/TitleWithValue";
import {machineryTypes} from "../model/slice";
import {MachineryStatus} from "../../../utils/const";
import {convertMillisecondsToDate} from "../../../utils/services";
import {ICurrentMachinery} from "../../../models/iMachinery";
import {useAppSelector} from "../../../hooks/redux";
import {getCurrentMachinery} from "../model/selectors";

interface IProps {
    editedMachinery: ICurrentMachinery  | null;
    isEditMode: boolean;
    machineryFieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent) => void
}

const MachineryDetailsInfo: FC<IProps> = ({
                                              editedMachinery,
                                              machineryFieldChangeHandler,
                                              isEditMode,
                                          }) => {
    const machinery = useAppSelector(getCurrentMachinery);
    if(!machinery) return null;
    return (
        <Stack spacing={2} sx={{width: "100%"}}>
            {isEditMode
                ? (<MachineryEdit editedMachinery={editedMachinery}
                                  machineryFieldChangeHandler={machineryFieldChangeHandler}/>)
                : (<>
                    <TitleWithValue title={"Тип:"} value={machineryTypes[machinery.type_id]?.title || ""}/>
                    <TitleWithValue title={"Марка:"} value={machinery.brand}/>
                    <TitleWithValue title={"Модель:"} value={machinery.model}/>
                    <TitleWithValue title={"VIN:"} value={machinery.vin}/>
                    <TitleWithValue title={"Гос. номер:"} value={machinery.state_number}/>
                    <TitleWithValue title={"Год выпуска:"} value={machinery.year_manufacture}/>
                    <TitleWithValue title={"Статус:"}
                                    value={machinery.status && machinery.status === MachineryStatus.disActive
                                        ? MachineryStatus.disActive
                                        : MachineryStatus.active}/>

                </>)}
            <TitleWithValue title={"Добавлена:"}
                            value={convertMillisecondsToDate(machinery.created_date)}/>
            <TitleWithValue title={"Отредактирована:"}
                            value={convertMillisecondsToDate(machinery.updated_date)}/>
        </Stack>
    );
};

export default MachineryDetailsInfo;