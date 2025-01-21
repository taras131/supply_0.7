import React, {ChangeEvent, FC, useId, useMemo} from 'react';
import {FormControl, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import {INewTask, ITask, taskPriority} from "../../../models/ITasks";
import TextField from "@mui/material/TextField";
import {getAllUsers} from "../../users/model/selectors";
import {useAppSelector} from "../../../hooks/redux";

interface IProps {
    editedTask: ITask | INewTask | null;
    taskFieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent) => void
}

const TasksEdit:FC<IProps> = ({editedTask, taskFieldChangeHandler}) => {
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

    if(!editedTask) return null;
    return (
        <Stack spacing={2} mt={4}>
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
            </FormControl>
            <FormControl fullWidth>
                <Select
                    id={priorityId}
                    value={`${editedTask.assigned_to}`}
                    onChange={taskFieldChangeHandler}
                    sx={{overflow: "hidden"}}
                    fullWidth
                    name={"assigned_to"}
                >
                    {assignedList}
                </Select>
            </FormControl>
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
        </Stack>
    );
};

export default TasksEdit;