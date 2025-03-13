import {RootState} from "../../../store";
import {IUser} from "../../../models/IUser";


export const getAllUsers = (state: RootState): IUser[] => {
    return state.users.list;
};

export const getUserById = (state: RootState, useId: number): IUser => {
    return state.users.list.filter((user: IUser) => user.id === useId)[0];
};

export const getUserFullNameById = (state: RootState, userId: number | null): string => {
    const user = state.users.list.find(user => user.id === userId);
    return user ? `${user.first_name} ${user.middle_name}`  : "";
};