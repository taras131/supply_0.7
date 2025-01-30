import { RootState } from "../../../store";
import {IUser} from "../../../models/IUser";

export const getIsAuth = (state: RootState): boolean => {
  return state.auth.isAuth;
};
export const getUser = (state: RootState): IUser | null => {
  return state.auth.currentUser;
};
export const getCurrentUser = (state: RootState): IUser | null => {
  return state.auth.currentUser;
};
export const getCurrentUserId = (state: RootState): number  => {
  return state.auth.currentUser?.id || 0;
};
export const getIsAuthLoading = (state: RootState): boolean => {
  return state.auth.isLoading;
};
export const getAuthErrorMessage = (state: RootState): string => {
  return state.auth.errorMessage;
};

