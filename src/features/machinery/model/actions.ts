import {createAsyncThunk} from "@reduxjs/toolkit";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {IMachinery, INewMachinery, INewMachineryDoc} from "../../../models/iMachinery";
import {machineryAPI} from "../api";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {setMessage} from "../../../store/reducers/message";
import {IComment, INewComment} from "../../../models/iComents";
import {filesAPI} from "../../../api/files";

export const fetchAddMachinery = createAsyncThunk("fetch_add_machinery", async (machinery: INewMachinery, {
    rejectWithValue,
    dispatch,
}) => {
    try {
        const newMachinery = await machineryAPI.addMachinery(machinery);
        return {...newMachinery};
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

export const fetchUpdateMachinery = createAsyncThunk(
    "fetch_update_machinery",
    async (machinery: IMachinery, {rejectWithValue, dispatch}) => {
        console.log(machinery);
        try {
            return await machineryAPI.updateMachinery(machinery);
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

export const fetchGetAllMachinery = createAsyncThunk(
    "fetch_get_all_machinery",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const res = await machineryAPI.getAll();
            return res.data;
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

export const fetchGetMachineryById = createAsyncThunk(
    "fetch_get_a_machinery_by_id",
    async (machinery_id: number, {rejectWithValue, dispatch}) => {
        try {
            const res = await machineryAPI.getOne(machinery_id);
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
    },
);

export const fetchAddMachineryComment = createAsyncThunk("fetch_add_machinery_comment",
    async (comment: INewComment, {
        rejectWithValue,
        dispatch,
    }) => {
        try {
            return await machineryAPI.addComment(comment);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить заметку.",
                }));
            return rejectWithValue(handlerError(e));
        }
    });

export const fetchDeleteMachineryComment = createAsyncThunk("fetch_delete_machinery_comment",
    async (comment_id: number, {
        rejectWithValue,
        dispatch,
    }) => {
        try {
            await machineryAPI.deleteComment(comment_id);
            return comment_id;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось удалить заметку.",
                }));
            return rejectWithValue(handlerError(e));
        }
    });

export const fetchUpdateMachineryComment = createAsyncThunk(
    "fetch_update_machinery_comment",
    async (comment: IComment, {rejectWithValue, dispatch}) => {
        try {
            return await machineryAPI.updateComment(comment);
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

interface IUploadPhoto {
    machinery: IMachinery;
    formData: FormData;
}

export const fetchUploadMachineryPhoto = createAsyncThunk(
    "fetch_update_machinery_photo",
    async (uploadData: IUploadPhoto, {rejectWithValue, dispatch}) => {
        try {
            const res = await filesAPI.upload(uploadData.formData);
            const updatedMachinery = {
                ...uploadData.machinery
                , photos: [...uploadData.machinery.photos, res.filename],
            };
            return await machineryAPI.updateMachinery(updatedMachinery);
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

interface IDeletePhoto {
    machinery: IMachinery;
    deletePhoto: string;
}

export const fetchDeleteMachineryPhoto = createAsyncThunk(
    "fetch_delete_machinery_photo",
    async (deleteDate: IDeletePhoto, {rejectWithValue, dispatch}) => {
        try {
            const {deletePhoto, machinery} = deleteDate;
            const res = await filesAPI.delete(deletePhoto);
            const updatedMachinery = {
                ...machinery, photos: [...machinery.photos.filter(photo => photo !== res.filename)],
            };
            return await machineryAPI.updateMachinery(updatedMachinery);
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

interface IAddDoc {
    doc: INewMachineryDoc
    formData: FormData
}

export const fetchAddMachineryDoc = createAsyncThunk(
    "fetch_add_machinery_doc",
    async (addDocData: IAddDoc, {rejectWithValue, dispatch}) => {
        try {
            const res = await filesAPI.upload(addDocData.formData);
            return await machineryAPI.addDoc({doc: addDocData.doc, fileName: res.filename} );
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось добавить документ.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);

