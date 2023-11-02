import {TShipmentsType} from "./iShipments";
import {ordersTypes, shipmentTypes} from "../utils/const";

export type TOrdersType = "current" | "annual"

export interface IOrderItem {
    id: number
    name: string
    catalogNumber: string
    count: number
    comment: string
    isOrdered: boolean
}

export interface INewOrder {
    author: {
        userId: string
        dateCreating: number
    }
    title: string
    shipmentType: TShipmentsType
    orderType: TOrdersType
    orderItems: IOrderItem []
    comment: string
}

export interface IOrder extends INewOrder {
    id: string
}

export const emptyOrder: IOrder = {
    id: "new",
    author: {
        userId: "",
        dateCreating: 0,
    },
    title: "",
    shipmentType: shipmentTypes[0].name,
    orderType: ordersTypes[0].name,
    orderItems: [
        {
            id: 0,
            name: "",
            catalogNumber: "",
            count: 1,
            comment: "",
            isOrdered: false,
        },
    ],
    comment: "",
};