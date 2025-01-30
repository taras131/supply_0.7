import {createAsyncThunk} from "@reduxjs/toolkit";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {filesAPI} from "../api";

export const fetchAddFile = createAsyncThunk(
    "fetch_add_file",
    async (formData: FormData, {rejectWithValue, dispatch}) => {
        try {
            const res = await filesAPI.upload(formData);
            console.log(res.filename);
            return res.filename;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить файл.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);

export const fetchDeleteFile = createAsyncThunk(
    "fetch_delete_file",
    async (deletePhoto: string, {rejectWithValue, dispatch}) => {
        try {
            const res = await filesAPI.delete(deletePhoto);
            console.log(res.filename);
            return res.filename;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить файл.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);