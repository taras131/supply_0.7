import {TShipmentsType} from "./iShipments";

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
    type: TShipmentsType
    orderItems: IOrderItem []
    comment: string
}

export interface IOrder extends INewOrder {
    id: string
}