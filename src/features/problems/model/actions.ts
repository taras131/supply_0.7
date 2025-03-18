import {createAsyncThunk} from "@reduxjs/toolkit";
import {INewProblem, IProblem} from "../../../models/IProblems";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {filesAPI} from "../../files/api";
import {problemsAPI} from "../api";

export interface IAddProblem {
    newProblem: INewProblem;
    files: File []
}

export const fetchAddProblem = createAsyncThunk("fetch_add_problem"
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
            const res = await problemsAPI.addNewProblem(problem_in);
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

export const fetchUpdateProblem = createAsyncThunk(
    "fetch_update_machinery_problem",
    async (problem: IProblem, {rejectWithValue, dispatch}) => {
        try {
            return await problemsAPI.updateProblem(problem);
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
            return dispatch(fetchUpdateProblem(updatedProblem)).unwrap();
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