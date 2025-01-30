import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {fetchCheckAuth, fetchLogin, fetchOut, fetchRegister} from "./actions";
import {IUser} from "../../../models/IUser";

export interface IAuthState {
  errorMessage: string;
  isLoading: boolean;
  isAuth: boolean;
  currentUser: IUser | null;
}

const initialState: IAuthState = {
  errorMessage: "",
  isLoading: false,
  isAuth: false,
  currentUser: null,
};

const handlePending = (state: IAuthState) => {
  state.isLoading = true;
  state.errorMessage = "";
};

const handleRejected = (state: IAuthState, action: any) => {
  state.isLoading = false;
  state.errorMessage = action.payload as string;
};


export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    cleanErrorMessage: (state) => {
      state.errorMessage = "";
    },

  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
          state.currentUser = action.payload;
          state.isAuth = true;
          state.isLoading = false;
        })
        .addCase(fetchCheckAuth.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.currentUser = action.payload;
            state.isAuth = true;
            state.isLoading = false;
        })
        .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<IUser>) => {
          state.isAuth = true;
          state.currentUser = action.payload;
          state.isLoading = false;
        })
        .addCase(fetchOut.fulfilled, (state) => {
          state.isAuth = false;
          state.currentUser = null;
          state.isLoading = false;
        })
        .addMatcher(
            (action) => action.type.endsWith("/pending"),
            handlePending
        )
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            handleRejected
        );
  },
});

export const { setIsAuth} = AuthSlice.actions;
export default AuthSlice.reducer;
