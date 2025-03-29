import React, {ChangeEvent, useEffect, useState} from "react";
import {SelectChangeEvent, Stack, Typography} from "@mui/material";
import {TaskList} from "./TasksList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getTaskIsLoading, getTasks} from "../model/selectors";
import {fetchGetTasks} from "../model/actions";
import Preloader from "../../../components/Preloader";
import TasksPageHeader from "./TasksPageHeader";

const TasksPage = () => {
    const [tasksFilter, setTasksFilter] = useState({
        machinery_id: -1,
        type_id: -1,
        text: "",
        status_id: -1,
    });
    let filteredTasks = useAppSelector(getTasks);
    const isLoading = useAppSelector(getTaskIsLoading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGetTasks());
    }, []);
    const filterChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => {
        if (e && e.target.name) {
            setTasksFilter(prev => ({...prev, [e.target.name]: e.target.value}));
        }
    };
    if (isLoading) return (<Preloader/>);
    if (tasksFilter.machinery_id > 0) {
        filteredTasks = filteredTasks.filter(task => task.machinery_id === tasksFilter.machinery_id);
    }
    if (tasksFilter.type_id > 0) {
        filteredTasks = filteredTasks.filter(task => task.type_id === tasksFilter.type_id);
    }
    if (tasksFilter.status_id > 0) {
        filteredTasks = filteredTasks.filter(task => task.status_id === tasksFilter.status_id);
    }
    if (tasksFilter.text.length > 0) {
        filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(tasksFilter.text.toLowerCase())
            || task.description.toLowerCase().includes(tasksFilter.text.toLowerCase()));
    }
    return (
        <Stack spacing={4}>
            <TasksPageHeader tasksFilter={tasksFilter} filterChangeHandler={filterChangeHandler}/>
            {filteredTasks.length
                ? (<TaskList tasks={filteredTasks}/>)
                : <Typography textAlign="center" mt={5}>
                    Нет задач , отвечающих параметрам фильтрации
                </Typography>}
        </Stack>
    );
};

export default TasksPage;