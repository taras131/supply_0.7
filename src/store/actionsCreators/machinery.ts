import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api";
import {handlerError} from "./handleError";
import {IMachinery, INewMachinery} from "../../models/iMachinery";

export const fetchAddMachinery = createAsyncThunk(
    "fetch_add_machinery",
    async (machinery: INewMachinery, ThunkAPI) => {
        try {
            const res = await api.addMachinery(machinery);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);

export const fetchUpdateMachinery = createAsyncThunk(
    "fetch_update_machinery",
    async (machinery: IMachinery, ThunkAPI) => {
        try {
            const res = await api.updateMachinery(machinery);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);