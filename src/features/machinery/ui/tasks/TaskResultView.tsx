import React, {ChangeEvent, FC} from "react";
import {INewTask, ITask} from "../../../../models/ITasks";
import {ValidationErrors} from "../../../../utils/validators";
import {SelectChangeEvent, Stack} from "@mui/material";
import FieldControl from "../../../../components/common/FieldControl";

interface IProps {
    task: INewTask | ITask | null;
    errors?: ValidationErrors;
    isEditMode?: boolean;
    fieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void
}

const TaskResultView: FC<IProps> = ({task, errors, isEditMode = false, fieldChangeHandler}) => {

    if (!task) return null;
    return (
        < Stack spacing={isEditMode ? 2 : 4}>
            {"result_description" in task && "spent_resources" in task && (
                <>
                    <FieldControl
                        label="Результат"
                        name="result_description"
                        id="result_description"
                        value={task.result_description}
                        error={errors?.result_description}
                        isEditMode={isEditMode}
                        onChange={fieldChangeHandler}
                        isRequired
                        isMultiline
                        rows={5}
                    />
                    <FieldControl
                        label="Потраченные материалы"
                        name="result_description"
                        id="result_description"
                        value={task.spent_resources}
                        error={errors?.spent_resources}
                        isEditMode={isEditMode}
                        onChange={fieldChangeHandler}
                        isRequired
                        isMultiline
                        rows={5}
                    />
                </>
            )}
        </Stack>
    );
};

export default TaskResultView;