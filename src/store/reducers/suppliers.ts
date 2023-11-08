import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISupplier} from "../../models/iSuppliers";

interface ISuppliersState {
    list: ISupplier []
    isLoading: boolean
    errorMessage: string
}

const initialState: ISuppliersState = {
    list: [],
    isLoading: true,
    errorMessage: "",
};

export const SuppliersSlice = createSlice({
    name: "suppliers",
    initialState,
    reducers: {
        setSuppliers: (state, action: PayloadAction<ISupplier []>) => {
            state.list = action.payload;
            state.isLoading = false;
        },
        setSuppliersLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {},
});

export const {
    setSuppliers, setSuppliersLoading,
} = SuppliersSlice.actions;

export default SuppliersSlice.reducer;