import {IInvoice} from "../../models/iInvoices";
import {RootState} from "../index";

export const getInvoices = (state: RootState): IInvoice[] => {
    const arr = [...state.invoices.list]
    return arr.sort((a, b) => {
        return b.author.date - a.author.date
    })
}
export const getCountUnpaidInvoices = (state: RootState): number => {
    let unPaidInvoices = [...state.invoices.list.filter(invoice => !invoice.paid.isPaid)]
    return unPaidInvoices.filter(invoice => !invoice.cancel || !invoice.cancel.isCancel).length
}
export const getAmountUnpaidInvoices = (state: RootState): number => {
    let amount = 0
    state.invoices.list.forEach(invoice => {
        if (!invoice.paid.isPaid) {
            if (!invoice.cancel || !invoice.cancel.isCancel) {
                amount += invoice.amount
            }
        }
    })
    return amount
}
export const getAmountBySupplierId = (state: RootState, supplierId: string): number => {
    let amount = 0
    state.invoices.list.forEach(invoice => {
        if (invoice.supplierId === supplierId && invoice.paid.isPaid) amount += invoice.amount
    })
    return amount
}
export const getInvoiceById = (state: RootState, invoiceId: string) => {
    return state.invoices.list.filter(invoice => invoice.id === invoiceId)[0]
}