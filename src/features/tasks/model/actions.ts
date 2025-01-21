import {createAsyncThunk} from "@reduxjs/toolkit";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {INewTask} from "../../../models/ITasks";
import {tasksAPI} from "../api";

export const fetchAddTask = createAsyncThunk("fetch_add_task", async (newTask: INewTask, {
    rejectWithValue,
    dispatch,
}) => {
    try {
        console.log(newTask);
        const task = await tasksAPI.addNew(newTask);
        console.log(task);
        return {...task};
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
        dispatch(
            setMessage({
                severity: MESSAGE_SEVERITY.error,
                text: errorMessage || "Не удалось добавить машину.",
            }));
        return rejectWithValue(handlerError(e));
    }
});