import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TaskList} from "./TasksList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getTaskIsLoading, getTasks} from "../model/selectors";
import {fetchGetTasks} from "../model/actions";
import Preloader from "../../../components/Preloader";

const TasksPage = () => {
    const tasks = useAppSelector(getTasks);
    const isLoading = useAppSelector(getTaskIsLoading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGetTasks());
    }, []);
    if(isLoading) return (<Preloader/>);
    return (
        <Stack spacing={4}>
            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Задачи</Typography>
            </Stack>
            <TaskList tasks={tasks}/>
        </Stack>
    );
};

export default TasksPage;