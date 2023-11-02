import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {emptyOrder, emptyOrderItem, IOrder} from "../../models/iOrders";

interface IUpdateOrderItems {
    id: number
    name: string
    newValue: string
}

interface IUpdateOrderItemsCount {
    id: number
    newValue: number
}

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
        setCurrenOrderIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        updateItemsValues: (state, action: PayloadAction<IUpdateOrderItems>) => {
            const {id, name, newValue} = action.payload;
            state.currentOrder = {
                ...state.currentOrder, orderItems: [...state.currentOrder.orderItems.map(item => {
                    if (item.id === id) {
                        return {...item, [name]: newValue};
                    } else {
                        return item;
                    }
                })],
            };
        },
        updateItemsCount: (state, action: PayloadAction<IUpdateOrderItemsCount>) => {
            const {id, newValue} = action.payload;
            state.currentOrder = {
                ...state.currentOrder, orderItems: [...state.currentOrder.orderItems.map(item => {
                    if (item.id === id) {
                        return {...item, count: newValue};
                    } else {
                        return item;
                    }
                })],
            };
        },
        addEmptyOrderItem: (state, action: PayloadAction<number>) => {
            state.currentOrder = {
                ...state.currentOrder,
                orderItems: [...state.currentOrder.orderItems, {...emptyOrderItem, id: action.payload}],
            };
        },
        removeOrderItem: (state, action: PayloadAction<number>) => {
            state.currentOrder = {
                ...state.currentOrder,
                orderItems: [...state.currentOrder.orderItems.filter(item => item.id !== action.payload)],
            };
        },
    },
    extraReducers: {},
});

export const {
    setOrders,
    setOrdersLoading,
    setCurrentOrder,
    setCurrenOrderIsEdit,
    updateItemsValues,
    updateItemsCount,
    addEmptyOrderItem,
    removeOrderItem,
} = OrdersSlice.actions;

export default OrdersSlice.reducer;