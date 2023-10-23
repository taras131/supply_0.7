import {RootState} from "../index";
import {IUser} from "../../models/iAuth";

export const getIsAuth = (state: RootState): boolean => {
    return state.auth.isAuth;
};
export const getUser = (state: RootState): IUser => {
    return state.auth.user;
};
export const getIsAuthLoading = (state: RootState): boolean => {
    return state.auth.isLoading;
};
export const getAuthErrorMessage = (state: RootState): string => {
    return state.auth.errorMessage;
};
export const getAllUsers = (state: RootState): IUser [] => {
    return state.auth.allUsers;
};
export const getUserById = (state: RootState, userId: string): IUser => {
    return state.auth.allUsers.filter(user => user.id === userId)[0];
};

export const getUserFullNameById = (state: RootState, userId: string): string => {
    const user = getUserById(state, userId);
    if (user && user.firstName) {
        return `${user.firstName} ${user.middleName}`;
    } else {
        return "";
    }
};