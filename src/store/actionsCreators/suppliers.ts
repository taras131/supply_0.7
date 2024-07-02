import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { INewSupplier, ISupplier } from "../../models/iSuppliers";
import { handlerError } from "./handleError";

export const fetchGetSuppliers = createAsyncThunk(
  "fetch_get_suppliers",
  async (dispatchSetSuppliers: (suppliesArr: ISupplier[]) => void, ThunkAPI) => {
    try {
      const res = await api.getSuppliers(dispatchSetSuppliers);
      return res;
    } catch (e) {
      return ThunkAPI.rejectWithValue(handlerError(e));
    }
  },
);

export const fetchAddSupplier = createAsyncThunk("fetch_add_supplier", async (supplier: INewSupplier, ThunkAPI) => {
  try {
    const res = await api.addSupplier(supplier);
    return res;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handlerError(e));
  }
});
