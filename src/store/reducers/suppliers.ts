import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISupplier } from "models/iSuppliers";
import { RootState } from "store/index";

interface ISuppliersState {
  list: ISupplier[];
  isLoading: boolean;
  errorMessage: string;
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
    setSuppliers: (state, action: PayloadAction<ISupplier[]>) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    setSuppliersLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {},
});

const selectSuppliersState = (state: RootState) => state.suppliers;
export const selectSuppliers = createSelector([selectSuppliersState], (suppliersState) => {
  return suppliersState.list.slice().sort((a,b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "ru");
  });
});

export const { setSuppliers, setSuppliersLoading } = SuppliersSlice.actions;

export default SuppliersSlice.reducer;
