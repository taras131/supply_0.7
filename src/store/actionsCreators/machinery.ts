import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api";
import {handlerError} from "./handleError";
import {INewMachinery} from "../../models/iMachinery";

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