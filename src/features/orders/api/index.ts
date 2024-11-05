import {INewOrder, IOrder} from "models/iOrders";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {IUpdateApprovedOrderData} from "features/orders/model/actions";

export const ordersAPI = {
    addOrder: async (order: INewOrder) => {
        const res = await addDoc(collection(db, "orders"), order);
        return res;
    },
    updateOrder: async (order: IOrder) => {
        const res = await updateDoc(doc(db, "orders", order.id), {
            title: order.title,
            shipmentType: order.shipmentType,
            orderType: order.orderType,
            orderItems: order.orderItems,
            comment: order.comment,
            isCancelled: order.isCancelled ? order.isCancelled : false,
        });
        return res;
    },
    updateOrderApproved: async (updateApprovedOrderData: IUpdateApprovedOrderData) => {
        const res = await updateDoc(doc(db, "orders", updateApprovedOrderData.orderId), {
            approved: {
                isApproved: updateApprovedOrderData.newApproved.isApproved,
                userId: updateApprovedOrderData.newApproved.userId,
                date: updateApprovedOrderData.newApproved.date,
            },
        });
        return res;
    },
};