import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISupplier} from "../../../models/iSuppliers";
import {fetchGetSuppliers, fetchUpdateSupplier} from "./actions";

interface ISuppliersState {
    list: ISupplier[];
    isLoading: boolean;
    errorMessage: string;
}

const initialState: ISuppliersState = {
    list: [],
    isLoading: false,
    errorMessage: "",
};

const handlePending = (state: ISuppliersState) => {
    state.isLoading = true;
    state.errorMessage = "";
};

const handleRejected = (state: ISuppliersState, action: any) => {
    state.isLoading = false;
    state.errorMessage = action.payload as string;
};

export const SuppliersSlice = createSlice({
    name: "suppliers",
    initialState,
    reducers: {
        setSuppliers: (state, action: PayloadAction<ISupplier[]>) => {
            state.list = action.payload;
            state.isLoading = false;
        },
        setSuppliersLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetSuppliers.fulfilled, (state, action: PayloadAction<ISupplier []>) => {
                state.list = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchUpdateSupplier.fulfilled, (state, action: PayloadAction<ISupplier>) => {
                state.list = [...state.list.map(supplier => supplier.id === action.payload.id ? action.payload : supplier)];
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


export const {setSuppliers, setSuppliersLoading} = SuppliersSlice.actions;

export default SuppliersSlice.reducer;