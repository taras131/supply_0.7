export interface INewInvoices {
    author: {
        userId: string,
        date: string
    }
    approved: {
        isApproved: boolean
        userId: string
        date: string
    }
    paid: {
        isPaid: boolean
        userId: string
        date: string
    }
    amount: number
    isWithVAT: boolean
    requestId: string
    shipmentId: string
    supplierId: string
}
export interface IInvoices extends INewInvoices {
    id: string
}