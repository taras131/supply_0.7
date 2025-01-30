import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";

export const userRoles = [
    {id: 0, title: "Директор"},
    {id: 1, title: "Бухгалтер"},
    {id: 2, title: "Снабженец"},
    {id: 3, title: "Механик"},
    {id: 4, title: "Слесарь"},
    {id: 5, title: "Электрик"},
    {id: 5, title: "Энергетик"},
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