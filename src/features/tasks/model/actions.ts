import {createAsyncThunk} from "@reduxjs/toolkit";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {INewTask} from "../../../models/ITasks";
import {tasksAPI} from "../api";
import {filesAPI} from "../../../api/files";

export interface IAddTask {
    newTask: INewTask;
    formData: FormData
}

export const fetchAddTask = createAsyncThunk("fetch_add_task", async (addTaskData: IAddTask, {
    rejectWithValue,
    dispatch,
}) => {
    const {newTask, formData} = addTaskData;
    let task_in = {...newTask};
    try {
        for (const [key, value] of formData.entries()) {
            const singleFileFormData = new FormData();
            singleFileFormData.append(key, value);
            const res = await filesAPI.upload(singleFileFormData);
            task_in = {...task_in, issue_photos: [...task_in.issue_photos, res.filename]};
            console.log(`Файл с ключом ${key} успешно загружен:`, res);
        }
        const res = await tasksAPI.addNew(task_in);
        console.log(res);
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
});