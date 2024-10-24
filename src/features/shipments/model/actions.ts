import {createAsyncThunk} from "@reduxjs/toolkit";
import {INewShipments, IReceiving} from "models/iShipments";
import {shipmentsAPI} from "features/shipments/api";
import {handlerError} from "store/actionsCreators/handleError";

export const fetchAddShipment = createAsyncThunk("fetch_add_shipment", async (shipment: INewShipments, ThunkAPI) => {
    try {
        return await shipmentsAPI.addShipment(shipment);
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});

export interface IReceivingData {
    shipmentId: string;
    newReceiving: IReceiving;
}

export const fetchUpdateShipmentReceiving = createAsyncThunk(
    "update_shipment_receiving",
    async (updateReceivingData: IReceivingData, ThunkAPI) => {
        try {
            return  await shipmentsAPI.updateReceiving(updateReceivingData);
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);