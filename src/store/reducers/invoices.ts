import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ICommentsState {
    list: any
    isLoading: boolean
    errorMessage: string
}

const initialState: ICommentsState = {
    list: [],
    isLoading: false,
    errorMessage: ""
}

export const InvoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<any>) => {
            state.list = action.payload
        },
        setCommentsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: {}
})

export const {
    setComments, setCommentsLoading
} = InvoicesSlice.actions

export default InvoicesSlice.reducer