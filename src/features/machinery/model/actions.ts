import {createAsyncThunk} from "@reduxjs/toolkit";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {ICurrentMachinery, IMachinery, INewMachinery, INewMachineryDoc} from "../../../models/iMachinery";
import {machineryAPI} from "../api";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {setMessage} from "../../../store/reducers/message";
import {IComment, INewComment} from "../../../models/iComents";
import {INewTask, ITask} from "../../../models/ITasks";
import {filesAPI} from "../../files/api";
import {INewProblem} from "../../../models/IProblems";

interface IAddMachinery {
    newMachinery: INewMachinery;
    files: File [];
}

export const fetchAddMachinery = createAsyncThunk("fetch_add_machinery"
    , async (addMachineryData: IAddMachinery, {
        rejectWithValue,
        dispatch,
    }) => {
        const {newMachinery, files} = addMachineryData;
        try {
            if (files.length > 0) {
                for (const file of files) {
                    const formData = new FormData();
                    formData.append("file", file);
                    const uploadedFile = await filesAPI.upload(formData);
                    newMachinery.photos.push(uploadedFile.filename);
                }
            }
            const res = await machineryAPI.addMachinery(newMachinery);
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

export const fetchUpdateMachinery = createAsyncThunk(
    "fetch_update_machinery",
    async (machinery: ICurrentMachinery, {rejectWithValue, dispatch}) => {
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
    file: File;
}

export const fetchUploadMachineryPhoto = createAsyncThunk(
    "fetch_update_machinery_photo",
    async (uploadData: IUploadPhoto, {rejectWithValue, dispatch}) => {
        try {
            const formData = new FormData();
            formData.append("file", uploadData.file);
            const res = await filesAPI.upload(formData);
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
    deletePhotoName: string;
}

export const fetchDeleteMachineryPhoto = createAsyncThunk(
    "fetch_delete_machinery_photo",
    async (deleteDate: IDeletePhoto, {rejectWithValue, dispatch}) => {
        try {
            const {deletePhotoName, machinery} = deleteDate;
            const res = await filesAPI.delete(deletePhotoName);
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
            return await machineryAPI.addDoc({doc: addDocData.doc, fileName: res.filename});
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

export interface IAddTask {
    newTask: INewTask;
    formData: FormData
}

export const fetchAddMachineryTask = createAsyncThunk("fetch_add_task", async (addTaskData: IAddTask, {
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
        return await machineryAPI.addNewTask(task_in);

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

export const fetchUpdateMachineryTask = createAsyncThunk(
    "fetch_update_task",
    async (task: ITask, {rejectWithValue, dispatch}) => {
        try {
            return await machineryAPI.updateTask(task);
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

export interface IAddProblem {
    newProblem: INewProblem;
    files: File []
}

export const fetchAddMachineryProblem = createAsyncThunk("fetch_add_problem"
    , async (addProblemData: IAddProblem, {
        rejectWithValue,
        dispatch,
    }) => {
        const {newProblem, files} = addProblemData;
        const problem_in = {...newProblem};
        try {
            if (files.length > 0) {
                for (const file of files) {
                    const formData = new FormData();
                    formData.append("file", file);
                    const uploadedFile = await filesAPI.upload(formData);
                    problem_in.photos.push(uploadedFile.filename);
                }
            }
            const res = await machineryAPI.addNewProblem(problem_in);
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



