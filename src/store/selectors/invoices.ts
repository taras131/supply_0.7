import {IInvoice} from "../../models/iInvoices";
import {RootState} from "../index";
import {ISelectedOrderPosition} from "../../models/iOrders";
import {getSupplierNameById} from "./suppliers";
import {IShipmentsInvoice} from "../../models/iShipments";

export const getInvoices = (state: RootState,): IInvoice[] => {
    const arr = [...state.invoices.list];
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
export const getInvoiceById = (state: RootState, invoiceId: string): IInvoice => {
    return state.invoices.list.filter(invoice => invoice.id === invoiceId)[0];
};
export const getInvoicesByIds = (state: RootState, invoiceShipments: IShipmentsInvoice[]): IInvoice [] => {
    const arr: IInvoice[] = [];
    invoiceShipments.forEach(invoiceShipment => {
        arr.push({...getInvoiceById(state, invoiceShipment.invoiceId), volume: invoiceShipment.volume});
    });
    return arr;
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

export const getTotalTurnover = (state: RootState): number => {
    let result = 0;
     state.suppliers.list.forEach(supplier => {
        result += getAmountBySupplierId(state, supplier.id);
    });
    return result;
};