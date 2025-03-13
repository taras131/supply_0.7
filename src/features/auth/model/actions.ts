import {createAsyncThunk} from "@reduxjs/toolkit";
import {handlerError} from "../../../store/actionsCreators/handleError";
import {IAuthData, IRegisterData} from "../../../models/iAuth";
import {authAPI} from "../api";

export const fetchLogin = createAsyncThunk("fetch_login", async (authData: IAuthData, ThunkAPI) => {
    try {
        return await authAPI.login(authData);
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});

export const fetchRegister = createAsyncThunk("fetch_register", async (registerData: IRegisterData, ThunkAPI) => {
    try {
        return await authAPI.register(registerData);
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});

export const fetchOut = createAsyncThunk("fetch_out", async (_, ThunkAPI) => {
    try {
        return await authAPI.out();
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});

export const fetchCheckAuth = createAsyncThunk("fetch_check_auth", async (_, ThunkAPI) => {
    try {
        return await authAPI.check();
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});