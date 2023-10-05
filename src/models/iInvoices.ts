export interface IPaid {
    isPaid: boolean
    userId: string
    date: number
    paymentOrderFileLink: string
}
export interface IApproved {
    isApproved: boolean
    userId: string
    date: number
}

export interface INewInvoice {
    author: {
        userId: string,
        date: number
    }
    approved: IApproved
    paid: IPaid
    number: string
    amount: number
    isWithVAT: boolean
    requestId: string
    shipmentId: string
    supplierId: string
    invoiceFileLink: string
}

export interface IInvoice extends INewInvoice {
    id: string
}


export const emptyInvoice: INewInvoice = {
    author: {
        userId: "",
        date: 0
    },
    approved: {
        isApproved: false,
        userId: "",
        date: 0
    },
    paid: {
        isPaid: false,
        userId: "",
        date: 0,
        paymentOrderFileLink: ""
    },
    number: "",
    amount: 0,
    isWithVAT: true,
    requestId: "",
    shipmentId: "",
    supplierId: "",
    invoiceFileLink: ""
}