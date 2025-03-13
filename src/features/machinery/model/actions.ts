import {createAsyncThunk} from "@reduxjs/toolkit";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {ICurrentMachinery, IMachinery, INewMachinery, INewMachineryDoc} from "../../../models/iMachinery";
import {machineryAPI} from "../api";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {setMessage} from "../../../store/reducers/message";
import {IComment, INewComment} from "../../../models/iComents";
import {INewTask, ITask} from "../../../models/ITasks";
import {filesAPI} from "../../files/api";
import {INewProblem, IProblem} from "../../../models/IProblems";
import {thunkHandlers} from "../../../store/thunkHandlers";
import {AppDispatch, RootState} from "../../../store";
import {getProblemById} from "./selectors";

const messages = {
    addMachinery: {error: "Не удалось добавить машину.", success: "Машина добавлена"},
};

type ThunkConfig = {
    dispatch: AppDispatch;
    rejectValue: string;
}

interface IAddMachinery {
    newMachinery: INewMachinery;
    files: File [];
}

export const fetchAddMachinery = createAsyncThunk<IMachinery, IAddMachinery, ThunkConfig>(
    "machinery/fetchAddMachinery",
    async (addMachineryData, {dispatch, rejectWithValue}) => {
        try {
            const {newMachinery, files} = addMachineryData;
            if (files.length > 0) {
                for (const file of files) {
                    const formData = new FormData();
                    formData.append("file", file);
                    const uploadedFile = await filesAPI.upload(formData);
                    newMachinery.photos.push(uploadedFile.filename);
                }
            }
            const res = await machineryAPI.addMachinery(newMachinery);
            thunkHandlers.success(messages.addMachinery.success, dispatch);
            return res;
        } catch (e) {
            return rejectWithValue(thunkHandlers.error(e, messages.addMachinery.error, dispatch));
        }
    }
);

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
    files: File [];
}

export const fetchAddMachineryTask = createAsyncThunk("fetch_add_task", async (addTaskData: IAddTask, {
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
        const res = await machineryAPI.addNewTask(task_in);
        if (res.problem_id) {
            const state = getState() as RootState;
            const problem = getProblemById(state, res.problem_id);
            if (problem) {
                const updatedProblem = {...problem, tasks_id: [...problem.tasks_id, res.id], status_id: 2};
                dispatch(fetchUpdateMachineryProblem(updatedProblem));
            }
        }
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

export const fetchUpdateMachineryTask = createAsyncThunk(
    "fetch_update_task",
    async (task: ITask, {rejectWithValue, dispatch, getState}) => {
        try {
            const res = await machineryAPI.updateTask(task);
            if (res.problem_id && res.status_id !== 3) {
                const state = getState() as RootState;
                const problem = getProblemById(state, res.problem_id);
                if (problem) {
                    const updatedProblem = {...problem, status_id: res.status_id + 1};
                    dispatch(fetchUpdateMachineryProblem(updatedProblem));
                }
            }
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
            return dispatch(fetchUpdateMachineryTask(updatedTask)).unwrap();
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
            return dispatch(fetchUpdateMachineryTask(updatedTask)).unwrap();
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

export const fetchUpdateMachineryProblem = createAsyncThunk(
    "fetch_update_machinery_problem",
    async (problem: IProblem, {rejectWithValue, dispatch}) => {
        try {
            return await machineryAPI.updateProblem(problem);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.error,
                    text: errorMessage || "Не удалось обновить проблему.",
                }));
            return rejectWithValue(handlerError(e));
        }
    },
);

interface IUploadProblemPhoto {
    problem: IProblem;
    file: File;
}

export const fetchUploadProblemPhoto = createAsyncThunk(
    "fetch_upload_problem_photo",
    async (uploadData: IUploadProblemPhoto, {rejectWithValue, dispatch}) => {
        try {
            const formData = new FormData();
            formData.append("file", uploadData.file);
            const res = await filesAPI.upload(formData);
            const updatedProblem = {
                ...uploadData.problem
                , photos: [...uploadData.problem.photos, res.filename],
            };
            return dispatch(fetchUpdateMachineryProblem(updatedProblem)).unwrap();
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

interface IDeleteProblemPhoto {
    problem: IProblem;
    deletePhotoName: string;
}

export const fetchDeleteProblemPhoto = createAsyncThunk(
    "fetch_delete_problem_photo",
    async (deleteDate: IDeleteProblemPhoto, {rejectWithValue, dispatch}) => {
        try {
            const {deletePhotoName, problem} = deleteDate;
            const res = await filesAPI.delete(deletePhotoName);
            const updatedProblem = {
                ...problem, photos: [...problem.photos.filter(photo => photo !== res.filename)],
            };
            return dispatch(fetchUpdateMachineryProblem(updatedProblem)).unwrap();
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

