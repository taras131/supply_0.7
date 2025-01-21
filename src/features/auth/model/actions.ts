import { createAsyncThunk } from "@reduxjs/toolkit";
import { handlerError } from "../../../store/actionsCreators/handleError";
import { IAuthData, IRegisterData } from "../../../models/iAuth";
import {authAPI} from "../api";

export const fetchLogin = createAsyncThunk("fetch_login", async (authData: IAuthData, ThunkAPI) => {
  try {
    const res = await authAPI.login(authData);
    console.log(res);
    return res;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handlerError(e));
  }
});

export const fetchRegister = createAsyncThunk("fetch_register", async (registerData: IRegisterData, ThunkAPI) => {
  try {
    const res = await authAPI.register(registerData);
    return res;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handlerError(e));
  }
});

export const fetchOut = createAsyncThunk("fetch_out", async (_, ThunkAPI) => {
  try {
    const res = await authAPI.out();
    console.log(res);
    return res;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handlerError(e));
  }
});

export const fetchCheckAuth = createAsyncThunk("fetch_check_auth", async (_, ThunkAPI) => {
  try {
    const res = await authAPI.check();
    console.log(res);
    return res;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handlerError(e));
  }
});