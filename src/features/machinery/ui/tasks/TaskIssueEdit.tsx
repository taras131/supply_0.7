import React, {ChangeEvent, FC, useId, useMemo} from "react";
import {FormControl, FormHelperText, MenuItem, Select, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import {INewTask, ITask, taskPriority} from "../../../../models/ITasks";
import {useAppSelector} from "../../../../hooks/redux";
import {getAllUsers} from "../../../users/model/selectors";

interface IProps {
    editedTask: ITask | INewTask;
    handleDateChange: (date: Date | null) => void;
    taskFieldChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TaskIssueEdit:FC<IProps> = ({editedTask,handleDateChange, taskFieldChangeHandler}) => {
    const priorityId = useId();
    const assignedId = useId();
    const users = useAppSelector(getAllUsers);
    const taskPriorityList = useMemo(
        () =>
            taskPriority.map(priority => (
                <MenuItem key={priority.id} value={priority.id}>
                    {priority.title}
                </MenuItem>
            )),
        []
    );
    const assignedList = useMemo(
        () =>
            users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                    {`${user.first_name} ${user.middle_name}`}
                </MenuItem>
            )),
        []
    );
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" gutterBottom>
                    Добавить задачу
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <DatePicker
                        sx={{width: "150px"}}
                        label="Срок выполнения"
                        value={dayjs(editedTask.due_date)} // оборачиваем миллисекунды в dayjs
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
            </Stack>
            <TextField id="outlined-basic"
                       label="Заголовок"
                       variant="outlined"
                       name="title"
                       onChange={taskFieldChangeHandler}
                       value={editedTask.title}/>
            <TextField
                id="outlined-basic"
                label="Описание"
                variant="outlined"
                name="description"
                onChange={taskFieldChangeHandler}
                value={editedTask.description}
                multiline
                rows={5}
            />
            <FormControl fullWidth>
                <Select
                    id={priorityId}
                    value={`${editedTask.priority_id}`}
                    onChange={taskFieldChangeHandler}
                    sx={{overflow: "hidden"}}
                    fullWidth
                    name={"priority_id"}
                >
                    {taskPriorityList}
                </Select>
                <FormHelperText>Приоритет</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <Select
                    id={assignedId}
                    value={`${editedTask.assigned_to_id}`}
                    onChange={taskFieldChangeHandler}
                    sx={{overflow: "hidden"}}
                    fullWidth
                    name={"assigned_to_id"}
                >
                    {assignedList}
                </Select>
                <FormHelperText>Исполнитель</FormHelperText>
            </FormControl>
        </>
    );
};

export default TaskIssueEdit;