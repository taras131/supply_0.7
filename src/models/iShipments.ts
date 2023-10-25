export type TShipmentInvoiceValue = "completely" | "partly"

export interface IShipmentsInvoice {
    invoiceId: string
    volume: TShipmentInvoiceValue
}

export type TShipmentsType = "railway" | "air"

export interface INewShipments {
    author: {
        userId: string
        dateCreating: number
    }
    receiving: {
        userId: string
        dateCreating: number
        isReceived: boolean
    }
    ladingNumber: string
    ladingNumberFilePath: string
    transporter: string
    type: TShipmentsType
    invoicesList: IShipmentsInvoice []
}

export interface IShipments extends INewShipments {
    id: string
}