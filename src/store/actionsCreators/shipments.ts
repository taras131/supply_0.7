import {createAsyncThunk} from "@reduxjs/toolkit";
import {handlerError} from "./handleError";
import api from "../../api";
import {INewShipments} from "../../models/iShipments";

export const fetchAddShipment = createAsyncThunk(
    "fetch_add_shipment",
    async (shipment: INewShipments, ThunkAPI) => {
        try {
            const res = await api.addShipment(shipment);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);
