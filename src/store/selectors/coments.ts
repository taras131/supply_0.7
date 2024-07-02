import { RootState } from "../index";
import { IComment } from "../../models/iComents";

export const getComments = (state: RootState): IComment[] => {
  return state.comments.list;
};
export const getCommentsIsLoading = (state: RootState): boolean => {
  return state.comments.isLoading;
};
/*
export const getCommentsByInvoiceId = (state: RootState, invoiceId: string) :IComment[] => {
    return state.comments.list.filter(comment => comment.invoiceId === invoiceId);
};*/
