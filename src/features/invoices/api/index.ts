import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {ordersAPI} from "features/orders/api";
import {
    IAddInvoiceData, ILinkPositions,
    IUpdateApprovedData,
    IUpdateCancelData,
    IUpdatePaidData,
} from "features/invoices/model/actions";

export const invoicesAPI = {
    linkPosition: async (linkPositionsDate: ILinkPositions) => {
        const {orders, selectedPosition, invoiceId} =linkPositionsDate;
        for (const key in selectedPosition) {
            let order = orders.find((order) => order.id === key);
            if (order) {
                order = {
                    ...order,
                    orderItems: [
                        ...order.orderItems.map((orderItem) => {
                            if (selectedPosition[key].includes(orderItem.id)) {
                                return {...orderItem, invoiceId: invoiceId};
                            } else {
                                return orderItem;
                            }
                        }),
                    ],
                };
                await ordersAPI.updateOrder(order);
            }
        }
    },
    addInvoice: async (addInvoiceData: IAddInvoiceData) => {
        const {invoice, orders, selectedPosition} = addInvoiceData;
        const res = await addDoc(collection(db, "invoices"), invoice);
        await invoicesAPI.linkPosition({orders, selectedPosition, invoiceId: res.id});
        return res;
    },

    updateInvoice: async (updatePaidData: IUpdatePaidData) => {
        const res = await updateDoc(doc(db, "invoices", updatePaidData.invoiceId), {
            paid: {
                isPaid: updatePaidData.newPaid.isPaid,
                userId: updatePaidData.newPaid.userId,
                date: updatePaidData.newPaid.date,
                paymentOrderFileLink: updatePaidData.newPaid.paymentOrderFileLink,
            },
        });
        return res;
    },

    updateCancelInvoice: async (updateCancelData: IUpdateCancelData) => {
        const res = await updateDoc(doc(db, "invoices", updateCancelData.invoiceId), {
            cancel: {
                isCancel: updateCancelData.newCancel.isCancel,
                date: updateCancelData.newCancel.date,
                userId: updateCancelData.newCancel.userId,
            },
        });
        return res;
    },
    updateInvoiceApproved: async (updateApprovedData: IUpdateApprovedData) => {
        const res = await updateDoc(doc(db, "invoices", updateApprovedData.invoiceId), {
            approved: {
                isApproved: updateApprovedData.newApproved.isApproved,
                userId: updateApprovedData.newApproved.userId,
                date: updateApprovedData.newApproved.date,
            },
        });
        return res;
    },
};