import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api";
import {handlerError} from "./handleError";
import {IApproved, ICancel, INewInvoice, IPaid} from "../../models/iInvoices";

export const fetchAddInvoice = createAsyncThunk(
    "fetch_add_invoice",
    async (invoice: INewInvoice, ThunkAPI) => {
        try {
            const res = await api.addInvoice(invoice);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);
export interface IUpdatePaidData {
    invoiceId: string
    newPaid: IPaid
}

export const fetchUpdateInvoice = createAsyncThunk(
    "update_invoice",
    async (updatePaidData: IUpdatePaidData, ThunkAPI) => {
        try {
            const res = await api.updateInvoice(updatePaidData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);
export interface IUpdateApprovedData {
    invoiceId: string
    newApproved: IApproved
}
export const fetchUpdateInvoiceApproved = createAsyncThunk(
    "update_invoice_approved",
    async (updateApprovedData: IUpdateApprovedData, ThunkAPI) => {
        try {
            const res = await api.updateInvoiceApproved(updateApprovedData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);
export interface IUpdateCancelData {
    invoiceId: string
    newCancel: ICancel
}

export const fetchUpdateInvoiceCancel = createAsyncThunk(
    "update_invoice_cancel",
    async (updateCancelData: IUpdateCancelData, ThunkAPI) => {
        try {
            const res = await api.updateCancelInvoice(updateCancelData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);

export interface IFileData {
    file: File
    updateFile: (name: string, filePatch: string) => void
    setIsUpdateFileLoading: (isLoading: boolean) => void
}
export const fetchUploadFile = createAsyncThunk(
    "upload_file",
    async (fileData: IFileData, ThunkAPI) => {
        try {
            const res = await api.uploadFile(fileData);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);
export const fetchRemoveFile = createAsyncThunk(
    "remove_file",
    async (fileName: string, ThunkAPI) => {
        try {
            const res = await api.removeFile(fileName);
            return res;
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    }
);