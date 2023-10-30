import {RootState} from "../index";
import {IOrder} from "../../models/iOrders";

export const getOrders = (state: RootState): IOrder[] => {
    const arr = [...state.orders.list];
    return arr.sort((a, b) => {
        return b.author.dateCreating - a.author.dateCreating;
    });
};
export const getOrdersIsLoading = (state: RootState): boolean => {
    return state.orders.isLoading;
};