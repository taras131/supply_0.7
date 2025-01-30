import React, {ChangeEvent, FC, useId, useMemo} from "react";
import {FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import {INewTask, ITask} from "../../../../models/ITasks";
import {useAppSelector} from "../../../../hooks/redux";
import {getAllUsers} from "../../../users/model/selectors";
import PrioritiesSelect from "../common/PrioritiesSelect";

interface IProps {
    editedTask: ITask | INewTask;
    handleDateChange: (date: Date | null) => void;
    taskFieldChangeHandler: (e: ChangeEvent<HTMLInputElement
            | HTMLTextAreaElement>
        | SelectChangeEvent) => void;
}

const TaskIssueEdit: FC<IProps> = ({editedTask, handleDateChange, taskFieldChangeHandler}) => {
    const assignedId = useId();
    const users = useAppSelector(getAllUsers);
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
            <PrioritiesSelect currentPriorityId={editedTask.priority_id}
                              changeHandler={taskFieldChangeHandler}/>
            <FormControl fullWidth>
                <Select
                    id={assignedId}
                    variant="outlined"
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