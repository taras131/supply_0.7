import {IInvoice} from "../../models/iInvoices";
import {RootState} from "../index";
import {ISelectedOrderPosition} from "../../models/iOrders";
import {getSupplierNameById} from "./suppliers";

export const getInvoices = (state: RootState,
                            isShowCanceledInvoice: boolean,
                            isShowPaidInvoice: boolean): IInvoice[] => {
    let arr = [...state.invoices.list];
    if (!isShowCanceledInvoice) {
        arr = arr.filter(invoice => {
            if (invoice.cancel && invoice.cancel.isCancel) {
                return false;
            } else {
                return true;
            }
        });
    }
    if (!isShowPaidInvoice) {
        arr = arr.filter(invoice => !invoice.paid.isPaid);
    }
    return arr.sort((a, b) => {
        return b.author.date - a.author.date;
    });
};
export const getCountUnpaidInvoices = (state: RootState): number => {
    const unPaidInvoices = [...state.invoices.list.filter(invoice => !invoice.paid.isPaid)];
    return unPaidInvoices.filter(invoice => !invoice.cancel || !invoice.cancel.isCancel).length;
};
export const getAmountUnpaidInvoices = (state: RootState): number => {
    let amount = 0;
    state.invoices.list.forEach(invoice => {
        if (!invoice.paid.isPaid) {
            if (!invoice.cancel || !invoice.cancel.isCancel) {
                amount += invoice.amount;
            }
        }
    });
    return amount;
};
export const getAmountBySupplierId = (state: RootState, supplierId: string): number => {
    let amount = 0;
    state.invoices.list.forEach(invoice => {
        if (invoice.supplierId === supplierId && invoice.paid.isPaid) amount += invoice.amount;
    });
    return amount;
};
export const getInvoiceById = (state: RootState, invoiceId: string) => {
    return state.invoices.list.filter(invoice => invoice.id === invoiceId)[0];
};
export const getSelectedOrderPosition = (state: RootState): ISelectedOrderPosition => {
    return state.invoices.selectedPosition;
};
export const getIsPositionSelected = (state: RootState, orderId: string, positionId: number): boolean => {
    let res = false;
    if (state.invoices.selectedPosition[orderId]) {
        const positionArr = [...state.invoices.selectedPosition[orderId]];
        if (positionArr.find(item => item === positionId)) {
            res = true;
        }
    }
    return res;
};
export const getSupplierNameByInvoiceId = (state: RootState, invoiceId: string) => {
    const invoice = state.invoices.list.find(invoice => invoice.id === invoiceId);
    if(invoice && invoice.supplierId) {
        return getSupplierNameById(state, invoice.supplierId);
    } else {
        return "";
    }
};