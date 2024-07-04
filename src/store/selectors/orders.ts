import { RootState } from "../index";
import { IOrder } from "models/iOrders";
import { IInvoice } from "models/iInvoices";
import {getInvoiceById} from "store/selectors/invoices";

export const getOrders = (state: RootState, isSelectPositionMode = false): IOrder[] => {
  let arr: IOrder[] = [];
  if (isSelectPositionMode) {
    const tempArr = [...state.orders.list];
    tempArr.forEach((order) => {
      const tempOrder: IOrder = { ...order, orderItems: [] };
      order.orderItems.forEach((orderItem) => {
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
  return state.orders.list.filter((order) => order.id === orderId)[0];
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

export const getRelatedInvoicesByOrderID = (state: RootState, orderId: string): IInvoice[] => {
  const invoiceIds: string[] = [];
  const invoices: IInvoice[] = [];
  const order = getOrderById(state, orderId);
  order.orderItems.forEach((orderItem) => {
    if (orderItem.invoiceId && !invoiceIds.includes(orderItem.invoiceId)) {
      invoiceIds.push(orderItem.invoiceId);
    }
  });
  invoiceIds.forEach((id) => {
    invoices.push(getInvoiceById(state, id));
  });
  return invoices;
};
export const getRelatedOrdersByInvoiceId = (state: RootState, invoiceId: string): IOrder[] => {
  const orders: IOrder[] = [];
  state.orders.list.forEach((order) => {
    const include = order.orderItems.some((orderItems) => orderItems.invoiceId && orderItems.invoiceId === invoiceId);
    if (include) {
      orders.push(order);
    }
  });
  return orders;
};

export const getRelatedOrdersByMachineryId = (state: RootState, machineryId: string): IOrder[] => {
  const orders: IOrder[] = [];
  state.orders.list.forEach((order) => {
    if (order.machineryId && order.machineryId === machineryId) {
      orders.push(order);
    }
  });
  return orders;
};

export const getNumberAnnualOrders = (state: RootState) => {
  return state.orders.list.filter((order) => order.orderType === "annual").length;
};

export const getCurrentAnnualOrders = (state: RootState) => {
  return state.orders.list.filter((order) => order.orderType === "current").length;
};
