import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {emptyOrder, emptyOrderItem, IOrder, IOrderItem, TOrdersType} from "models/iOrders";
import {TShipmentsType} from "models/iShipments";

interface IUpdateOrderItems {
    id: number;
    name: string;
    newValue: string;
}

interface IUpdateOrderItemsCount {
    id: number;
    newValue: number;
}

interface IOrdersState {
    list: IOrder[];
    isLoading: boolean;
    errorMessage: string;
    currentOrder: IOrder;
    isEdit: boolean;
    search: string;
    machineryIdFilter: string;
}

const initialState: IOrdersState = {
    list: [],
    isLoading: false,
    errorMessage: "",
    currentOrder: emptyOrder,
    isEdit: false,
    search: "",
    machineryIdFilter: "empty",
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
        updateCurrentOrderTitle: (state, action: PayloadAction<string>) => {
            state.currentOrder.title = action.payload;
        },
        updateCurrentOrderShipmentType: (state, action: PayloadAction<TShipmentsType>) => {
            state.currentOrder.shipmentType = action.payload;
        },
        updateCurrentOrderType: (state, action: PayloadAction<TOrdersType>) => {
            state.currentOrder.orderType = action.payload;
        },
        updateCurrentOrderMachineryId: (state, action: PayloadAction<string>) => {
            state.currentOrder.machineryId = action.payload;
        },
        updateItemsValues: (state, action: PayloadAction<IUpdateOrderItems>) => {
            const {id, name, newValue} = action.payload;
            state.currentOrder = {
                ...state.currentOrder,
                orderItems: [
                    ...state.currentOrder.orderItems.map((item) => {
                        if (item.id === id) {
                            return {...item, [name]: newValue};
                        } else {
                            return item;
                        }
                    }),
                ],
            };
        },
        updateItemsCount: (state, action: PayloadAction<IUpdateOrderItemsCount>) => {
            const {id, newValue} = action.payload;
            state.currentOrder = {
                ...state.currentOrder,
                orderItems: [
                    ...state.currentOrder.orderItems.map((item) => {
                        if (item.id === id) {
                            return {...item, count: newValue};
                        } else {
                            return item;
                        }
                    }),
                ],
            };
        },
        addOrderItems: (state, action: PayloadAction<IOrderItem []>) => {
            state.currentOrder = {
                ...state.currentOrder,
                orderItems: action.payload,
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
                orderItems: [...state.currentOrder.orderItems.filter((item) => item.id !== action.payload)],
            };
        },
        removeOrderItems: (state) => {
            state.currentOrder = {
                ...state.currentOrder,
                orderItems: [{...emptyOrderItem, id: 0}],
            };
        },
        setOrdersSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setMachineryIdFilter: (state, action: PayloadAction<string>) => {
            state.machineryIdFilter = action.payload;
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
    addOrderItems,
    addEmptyOrderItem,
    removeOrderItem,
    removeOrderItems,
    updateCurrentOrderTitle,
    updateCurrentOrderShipmentType,
    updateCurrentOrderType,
    updateCurrentOrderMachineryId,
    setOrdersSearch,
    setMachineryIdFilter,
} = OrdersSlice.actions;

export default OrdersSlice.reducer;
