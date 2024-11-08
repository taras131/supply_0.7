import {TShipmentsType} from "./iShipments";
import {ordersTypes, shipmentTypes} from "../utils/const";
import {IApproved} from "./iInvoices";

export enum CompletionType {
    Invoice = "INVOICE",
    Cash = "CASH",           // Куплена за наличные
    Balance = "BALANCE",     // Забрана за счёт остатка средств
}

export type TOrdersType = "current" | "annual";

export interface ISelectedOrderPosition {
    [key: string]: number[];
}

export interface IOrderItem {
    id: number;
    name: string;
    catalogNumber: string;
    count: number;
    comment: string;
    isOrdered: boolean;
    invoiceId?: string;
    completionType?: CompletionType;
}

export interface INewOrder {
    author: {
        userId: string;
        dateCreating: number;
    };
    title: string;
    shipmentType: TShipmentsType;
    orderType: TOrdersType;
    orderItems: IOrderItem[];
    comment: string;
    approved: IApproved;
    machineryId?: string;
}

export interface IOrder extends INewOrder {
    id: string;
    isCancelled?: boolean;
}

export const emptyOrderItem: IOrderItem = {
    id: 1,
    name: "",
    catalogNumber: "",
    count: 1,
    comment: "",
    isOrdered: false,
};

export const emptyOrder: IOrder = {
    id: "new",
    author: {
        userId: "",
        dateCreating: 0,
    },
    title: "",
    shipmentType: shipmentTypes[0].name,
    orderType: ordersTypes[0].name,
    orderItems: [emptyOrderItem],
    comment: "",
    approved: {
        isApproved: false,
        userId: "",
        date: 0,
    },
    machineryId: "",
};
