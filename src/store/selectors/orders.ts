import {RootState} from "../index";
import {IOrder} from "../../models/iOrders";

export const getOrders = (state: RootState, isSelectPositionMode = false): IOrder[] => {
    let arr: IOrder [] = [];
    if (isSelectPositionMode) {
        const tempArr = [...state.orders.list];
        tempArr.forEach(order => {
            const tempOrder: IOrder = {...order, orderItems: []};
            order.orderItems.forEach(orderItem => {
                if (!orderItem.invoiceId) {
                    tempOrder.orderItems.push(orderItem);
                }
            });
            if (tempOrder.orderItems.length > 0) {
                arr.push(tempOrder);
            }
        });
    } else {
        arr = [...state.orders.list];
    }
    return arr.sort((a, b) => {
        return b.author.dateCreating - a.author.dateCreating;
    });
};
export const getOrderById = (state: RootState, orderId: string): IOrder => {
    return state.orders.list.filter(order => order.id === orderId)[0];
};
export const getOrdersIsLoading = (state: RootState): boolean => {
    return state.orders.isLoading;
};

export const getCurrentOrder = (state: RootState): IOrder => {
    return state.orders.currentOrder;
};

export const getCurrentOrderIsEdit = (state: RootState): boolean => {
    return state.orders.isEdit;
};