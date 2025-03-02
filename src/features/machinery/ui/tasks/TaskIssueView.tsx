import React, {ChangeEvent, FC} from "react";
import Card from "@mui/material/Card";
import {ValidationErrors} from "../../../../utils/validators";
import {SelectChangeEvent, Stack} from "@mui/material";
import {INewTask, ITask} from "../../../../models/ITasks";
import FieldControl from "../../../../components/common/FieldControl";
import {taskPriority, taskTypes} from "../../utils/const";
import {useAppSelector} from "../../../../hooks/redux";
import {getAllUsers} from "../../../users/model/selectors";
import {getActiveProblems} from "../../model/selectors";
import {convertMillisecondsToDate} from "../../../../utils/services";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface IProps {
    task: INewTask | ITask | null;
    errors?: ValidationErrors;
    isEditMode?: boolean;
    handleDateChange: (date: any) => void;
    fieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void
}

const TaskIssueView: FC<IProps> = ({task, errors, isEditMode = false, fieldChangeHandler, handleDateChange}) => {
    const users = useAppSelector(getAllUsers);
    const usersList = users.map(user => ({id: user.id, title: `${user.first_name} ${user.middle_name}`}));
    const activeProblem = useAppSelector(getActiveProblems);
    const activeProblemList = activeProblem.map(problem => ({
        id: problem.id,
        title: `${convertMillisecondsToDate(problem.created_date)} ${problem.title}`,
    }));
    if (!task) return null;
    return (
        <Card sx={{padding: "24px"}}>
            <Stack spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <DatePicker
                        label="Срок выполнения"
                        value={dayjs(task.due_date)}
                        onChange={handleDateChange}
                        format="DD.MM.YYYY"
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                variant: "outlined",
                            },
                        }}
                    />
                </LocalizationProvider>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <FieldControl
                        label="Тип работ"
                        name="type_id"
                        id="type_id"
                        value={task.type_id}
                        error={errors?.type_id}
                        isEditMode={isEditMode}
                        onChange={fieldChangeHandler}
                        options={taskTypes}
                    />
                    <FieldControl
                        label="Основание"
                        name="problem_id"
                        id="problem_id"
                        value={task.problem_id}
                        error={errors?.problem_id}
                        isEditMode={isEditMode}
                        onChange={fieldChangeHandler}
                        options={activeProblemList}
                    />
                </Stack>
                <FieldControl
                    label="Заголовок"
                    name="title"
                    id="title"
                    value={task.title}
                    error={errors?.title}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    isRequired
                />
                <FieldControl
                    label="Описание"
                    name="description"
                    id="description"
                    value={task.description}
                    error={errors?.description}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    isRequired
                    isMultiline
                />
                <Stack direction="row" spacing={2}>
                    <FieldControl
                        label="Приоритет"
                        name="priority_id"
                        id="priority_id"
                        value={task.priority_id}
                        error={errors?.priority_id}
                        isEditMode={isEditMode}
                        onChange={fieldChangeHandler}
                        options={taskPriority}
                        isRequired
                    />
                    <FieldControl
                        label="Исполнитель"
                        name="assigned_to_id"
                        id="assigned_to_id"
                        value={task.assigned_to_id}
                        error={errors?.assigned_to_id}
                        isEditMode={isEditMode}
                        onChange={fieldChangeHandler}
                        options={usersList}
                        isRequired
                    />
                </Stack>
            </Stack>
        </Card>
    );
};

export default TaskIssueView;