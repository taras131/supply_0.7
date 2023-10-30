import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "../../models/iOrders";

interface IOrdersState {
    list: IOrder[]
    isLoading: boolean
    errorMessage: string
}

const initialState: IOrdersState = {
    list: [],
    isLoading: false,
    errorMessage: "",
};

export const OrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<IOrder[]>) => {
            state.list = action.payload;
        },
        setOrdersLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {},
});

export const {
    setOrders, setOrdersLoading,
} = OrdersSlice.actions;

export default OrdersSlice.reducer;