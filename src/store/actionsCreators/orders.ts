import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { handlerError } from "./handleError";
import { INewOrder, IOrder } from "../../models/iOrders";
import { IApproved } from "../../models/iInvoices";

export const fetchAddOrder = createAsyncThunk("fetch_add_shipment", async (order: INewOrder, ThunkAPI) => {
  try {
    const res = await api.addOrder(order);
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
      const res = await api.updateOrderApproved(updateApprovedOrderData);
      return res;
    } catch (e) {
      return ThunkAPI.rejectWithValue(handlerError(e));
    }
  },
);

export const fetchUpdateOrder = createAsyncThunk("update_order", async (order: IOrder, ThunkAPI) => {
  try {
    const res = await api.updateOrder(order);
    return res;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handlerError(e));
  }
});
