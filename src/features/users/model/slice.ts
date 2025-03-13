import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";

export const userRoles = [
    {id: 1, title: "Директор"},
    {id: 2, title: "Бухгалтер"},
    {id: 3, title: "Снабженец"},
    {id: 4, title: "Механик"},
    {id: 5, title: "Слесарь"},
    {id: 6, title: "Электрик"},
    {id: 7, title: "Энергетик"},
];

export interface IUserState {
    errorMessage: string;
    isLoading: boolean;
    list: IUser[];
    wsConnected: boolean;
    wsMessage: string | null;
}

const initialState: IUserState = {
    errorMessage: "",
    isLoading: false,
    list: [],
    wsConnected: false,
    wsMessage: null,
};

export const UsersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        wsConnected: (state) => {
            state.wsConnected = true;
        },
        wsDisconnected: (state) => {
            state.wsConnected = false;
        },
        wsMessageReceived: (state, action: PayloadAction<any>) => {
            state.wsMessage = action.payload;
        },
        updateUsersList: (state, action: PayloadAction<IUser[]>) => {
            state.list = action.payload;
        },
    },
});

export const { wsConnected, wsDisconnected, wsMessageReceived, updateUsersList} = UsersSlice.actions;
export default UsersSlice.reducer;