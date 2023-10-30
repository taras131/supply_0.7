import {createAsyncThunk} from "@reduxjs/toolkit";
import {INewShipments} from "../../models/iShipments";
import api from "../../api";
import {handlerError} from "./handleError";
import {INewOrder} from "../../models/iOrders";

export const fetchAddOrder = createAsyncThunk(
    "fetch_add_shipment",
    async (order: INewOrder, ThunkAPI) => {
        try {
            const res = await api.addOrder(order);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);