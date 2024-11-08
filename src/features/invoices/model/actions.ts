import { createAsyncThunk } from "@reduxjs/toolkit";
import {IApproved, ICancel, INewInvoice, IPaid} from "models/iInvoices";
import {IOrder, ISelectedOrderPosition} from "models/iOrders";
import {invoicesAPI} from "features/invoices/api";
import {handlerError} from "store/actionsCreators/handleError";
import api from "api";

export interface ILinkPositions {
    selectedPosition: ISelectedOrderPosition;
    orders: IOrder[];
    invoiceId: string
}

export interface IAddInvoiceData {
    invoice: INewInvoice;
    selectedPosition: ISelectedOrderPosition;
    orders: IOrder[];
}

export const fetchAddInvoice = createAsyncThunk(
    "fetch_add_invoice",
    async (addInvoiceData: IAddInvoiceData, ThunkAPI) => {
        try {
            const res = await invoicesAPI.addInvoice(addInvoiceData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);

export const fetchLinkPositions = createAsyncThunk(
    "fetch_link_positions",
    async (linkPositionDate:ILinkPositions , ThunkAPI) => {
        try {
            const res = await invoicesAPI.linkPosition(linkPositionDate);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);

export interface IUpdatePaidData {
    invoiceId: string;
    newPaid: IPaid;
}

export const fetchUpdateInvoice = createAsyncThunk(
    "update_invoice",
    async (updatePaidData: IUpdatePaidData, ThunkAPI) => {
        try {
            const res = await invoicesAPI.updateInvoice(updatePaidData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);
export interface IUpdateApprovedData {
    invoiceId: string;
    newApproved: IApproved;
}
export const fetchUpdateInvoiceApproved = createAsyncThunk(
    "update_invoice_approved",
    async (updateApprovedData: IUpdateApprovedData, ThunkAPI) => {
        try {
            const res = await invoicesAPI.updateInvoiceApproved(updateApprovedData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);
export interface IUpdateCancelData {
    invoiceId: string;
    newCancel: ICancel;
}

export const fetchUpdateInvoiceCancel = createAsyncThunk(
    "update_invoice_cancel",
    async (updateCancelData: IUpdateCancelData, ThunkAPI) => {
        try {
            const res = await invoicesAPI.updateCancelInvoice(updateCancelData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);

export interface IFileData {
    file: File;
    updateFile: (name: string, filePatch: string) => void;
    setIsUpdateFileLoading: (isLoading: boolean) => void;
}
export const fetchUploadFile = createAsyncThunk("upload_file", async (fileData: IFileData, ThunkAPI) => {
    try {
        const res = await api.uploadFile(fileData);
        return res;
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});
export const fetchRemoveFile = createAsyncThunk("remove_file", async (fileName: string, ThunkAPI) => {
    try {
        const res = await api.removeFile(fileName);
        return res;
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});
