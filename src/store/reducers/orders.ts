import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {emptyOrder, IOrder} from "../../models/iOrders";

interface IOrdersState {
    list: IOrder[]
    isLoading: boolean
    errorMessage: string
    currentOrder: IOrder
    isEdit: boolean
}

const initialState: IOrdersState = {
    list: [],
    isLoading: false,
    errorMessage: "",
    currentOrder: emptyOrder,
    isEdit: false,
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
        setCurrentOrder: (state, action: PayloadAction<IOrder>) => {
            state.currentOrder = action.payload;
        },
        setCurrenOrderIsEdit: (state, action:PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
    },
    extraReducers: {},
});

export const {
    setOrders, setOrdersLoading,setCurrentOrder,setCurrenOrderIsEdit,
} = OrdersSlice.actions;

export default OrdersSlice.reducer;