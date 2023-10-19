import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/iAuth";
import {fetchLogin, fetchOut, fetchRegister} from "../actionsCreators/auth";

export interface IAuthState {
    errorMessage: string
    isLoading: boolean
    isAuth: boolean
    user: IUser
    allUsers: IUser []
}

const emptyUser= {
    firstName: "",
    middleName: "",
    role: "",
    uid: "",
    id: "",
    email: "",
};

const initialState: IAuthState = {
    errorMessage: "",
    isLoading: false,
    isAuth: false,
    user: emptyUser,
    allUsers: [],
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
        setAllUsers: (state, action:PayloadAction<IUser []>) =>{
            state.allUsers = action.payload;
        },
    },
    extraReducers: {
        [fetchLogin.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.user = state.allUsers.filter(user => user.uid === action.payload)[0];
            state.isAuth = true;
            state.isLoading = false;
        },
        [fetchLogin.pending.type]: (state) => {
            state.isLoading = true;
            state.errorMessage = "";
        },
        [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        [fetchRegister.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isAuth = true;
            state.user = action.payload;
            state.isLoading = false;
        },
        [fetchRegister.pending.type]: (state) => {
            state.isLoading = true;
            state.errorMessage = "";
        },
        [fetchRegister.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;

        },
        [fetchOut.fulfilled.type]: (state) => {
            state.isAuth = false;
            state.user = emptyUser;
            state.isLoading = false;
        },
        [fetchOut.pending.type]: (state) => {
            state.isLoading = true;
            state.errorMessage = "";
        },
        [fetchOut.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
    },
});

export const {
    setIsAuth, setAllUsers,
} = AuthSlice.actions;
export default AuthSlice.reducer;