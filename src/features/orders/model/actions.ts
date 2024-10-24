import {createAsyncThunk} from "@reduxjs/toolkit";
import {INewOrder, IOrder} from "models/iOrders";
import {handlerError} from "store/actionsCreators/handleError";
import {IApproved} from "models/iInvoices";
import {ordersAPI} from "features/orders/api";

export const fetchAddOrder = createAsyncThunk("fetch_add_shipment", async (order: INewOrder, ThunkAPI) => {
    try {
        const res = await ordersAPI.addOrder(order);
        return res;
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});

export interface IUpdateApprovedOrderData {
    orderId: string;
    newApproved: IApproved;
}

export const fetchUpdateOrderApproved = createAsyncThunk(
    "update_order_approved",
    async (updateApprovedOrderData: IUpdateApprovedOrderData, ThunkAPI) => {
        try {
            const res = await ordersAPI.updateOrderApproved(updateApprovedOrderData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);

export const fetchUpdateOrder = createAsyncThunk("update_order", async (order: IOrder, ThunkAPI) => {
    try {
        const res = await ordersAPI.updateOrder(order);
        return res;
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});