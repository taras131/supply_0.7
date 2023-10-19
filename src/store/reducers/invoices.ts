import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IInvoice} from "../../models/iInvoices";

interface ICommentsState {
    list: IInvoice []
    isLoading: boolean
    errorMessage: string
}

const initialState: ICommentsState = {
    list: [],
    isLoading: false,
    errorMessage: "",
};

export const InvoicesSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        setInvoices: (state, action: PayloadAction<IInvoice []>) => {
            state.list = action.payload;
        },
        setComments: (state, action: PayloadAction<any>) => {
            state.list = action.payload;
        },
        setCommentsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {},
});

export const {
    setInvoices, setComments, setCommentsLoading,
} = InvoicesSlice.actions;

export default InvoicesSlice.reducer;