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

    },
    extraReducers: {},
});

export const {
    setInvoices,
} = InvoicesSlice.actions;

export default InvoicesSlice.reducer;