import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IShipments} from "../../models/iShipments";

interface IShipmentsState {
    list: IShipments[]
    isLoading: boolean
    errorMessage: string
}

const initialState: IShipmentsState = {
    list: [],
    isLoading: false,
    errorMessage: "",
};

export const ShipmentSlice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        setShipments: (state, action: PayloadAction<IShipments[]>) => {
            state.list = action.payload;
        },
        setShipmentsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {},
});

export const {
    setShipments, setShipmentsLoading,
} = ShipmentSlice.actions;

export default ShipmentSlice.reducer;