import {INewTask, ITask} from "../../../models/ITasks";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {filesAPI} from "../../files/api";
import {RootState} from "../../../store";
import {getProblemById} from "../../problems/model/selectors";
import {fetchUpdateProblem} from "../../problems/model/actions";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {tasksAPI} from "../api";
import {currentMachineryAddTask, updateCurrentMachineryTask} from "../../machinery/model/slice";

export const fetchGetTasks = createAsyncThunk(
    "fetch_get_tasks",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            return await tasksAPI.getTasks();
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось получить задачи.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchGetTaskById = createAsyncThunk(
    "fetch_get_task_by_id",
    async (taskId: number, {rejectWithValue, dispatch}) => {
        try {
            return await tasksAPI.getTaskById(taskId);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось получить задачу.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);

export interface IAddTask {
    newTask: INewTask;
    files: File [];
}

export const fetchAddTask = createAsyncThunk("fetch_add_task", async (addTaskData: IAddTask, {
    rejectWithValue,
    dispatch,
    getState,
}) => {
    const {newTask, files} = addTaskData;
    const task_in = {...newTask};
    try {
        if (files.length > 0) {
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                const uploadedFile = await filesAPI.upload(formData);
                task_in.issue_photos.push(uploadedFile.filename);
            }
        }
        const res = await tasksAPI.addNewTask(task_in);
        if (res.problem_id) {
            const state = getState() as RootState;
            const problem = getProblemById(state, res.problem_id);
            if (problem) {
                const updatedProblem = {...problem, tasks_id: [...problem.tasks_id, res.id], status_id: 2};
                dispatch(fetchUpdateProblem(updatedProblem));
            }
        }
        dispatch(currentMachineryAddTask(res));
        return res;
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
        dispatch(
            setMessage({
                severity: MESSAGE_SEVERITY.error,
                text: errorMessage || "Не удалось добавить задачу.",
            }));
        return rejectWithValue(handlerError(e));
    }
});

export const fetchUpdateTask = createAsyncThunk(
    "fetch_update_task",
    async (task: ITask, {rejectWithValue, dispatch, getState}) => {
        try {
            const res = await tasksAPI.updateTask(task);
            if (res.problem_id && res.status_id !== 3) {
                const state = getState() as RootState;
                const problem = getProblemById(state, res.problem_id);
                if (problem) {
                    const updatedProblem = {...problem, status_id: res.status_id + 1};
                    dispatch(fetchUpdateProblem(updatedProblem));
                }
            }
            dispatch(updateCurrentMachineryTask(res));
            return res;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить машину.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);

interface IUploadTaskPhoto {
    task: ITask;
    file: File;
    type: "issue_photos" | "result_photos"
}

export const fetchUploadTaskPhoto = createAsyncThunk(
    "fetch_upload_task_photo",
    async (uploadData: IUploadTaskPhoto, {rejectWithValue, dispatch}) => {
        try {
            const {task, file, type} = uploadData;
            const formData = new FormData();
            formData.append("file", file);
            const res = await filesAPI.upload(formData);
            const updatedTask = {...task, [type]: [...task[type], res.filename]};
            return dispatch(fetchUpdateTask(updatedTask)).unwrap();
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить фото.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);

interface IDeleteTaskPhoto {
    task: ITask;
    deletePhotoName: string;
    type: "issue_photos" | "result_photos"
}

export const fetchDeleteTaskPhoto = createAsyncThunk(
    "fetch_delete_task_photo",
    async (deleteDate: IDeleteTaskPhoto, {rejectWithValue, dispatch}) => {
        try {
            const {task, deletePhotoName, type} = deleteDate;
            const res = await filesAPI.delete(deletePhotoName);
            const updatedTask = {
                ...task, [type]: [...task[type].filter(photo => photo !== res.filename)],
            };
            return dispatch(fetchUpdateTask(updatedTask)).unwrap();
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось удалить фото.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);