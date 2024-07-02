import { createAsyncThunk } from "@reduxjs/toolkit";
import { INewComment } from "../../models/iComents";
import { handlerError } from "./handleError";
import api from "../../api";

export const fetchAddComment = createAsyncThunk("fetch_add_comment", async (comment: INewComment, ThunkAPI) => {
  try {
    const res = await api.addComment(comment);
    return res;
  } catch (e) {
    return ThunkAPI.rejectWithValue(handlerError(e));
  }
});
