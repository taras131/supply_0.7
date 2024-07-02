import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMachinery } from "../../models/iMachinery";

interface IMachineryState {
  list: IMachinery[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: IMachineryState = {
  list: [],
  isLoading: false,
  errorMessage: "",
};

export const MachinerySlice = createSlice({
  name: "machinery",
  initialState,
  reducers: {
    setMachinery: (state, action: PayloadAction<IMachinery[]>) => {
      state.list = action.payload;
    },
    setMachineryLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {},
});

export const { setMachinery, setMachineryLoading } = MachinerySlice.actions;

export default MachinerySlice.reducer;
