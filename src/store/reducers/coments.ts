import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "models/iComents";
import { fetchAddComment } from "../actionsCreators/comments";
import { RootState } from "store/index";

interface ICommentsState {
  list: IComment[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: ICommentsState = {
  list: [],
  isLoading: false,
  errorMessage: "",
};

export const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.list = action.payload;
    },
    setCommentsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchAddComment.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [fetchAddComment.pending.type]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [fetchAddComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

const selectCommentsState = (state: RootState) => state.comments;
const selectCommentsList = (state: RootState) => state.comments.list;

export const selectCommentsByInvoiceId = (invoiceId: string) =>
  createSelector([selectCommentsList], (commentsList: IComment[]) => {
    return commentsList.filter((comment) => comment.invoiceId === invoiceId);
  });

export const { setComments, setCommentsLoading } = CommentsSlice.actions;

export default CommentsSlice.reducer;
