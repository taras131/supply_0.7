import {RootState} from "../index";
import {IMachinery} from "../../models/iMachinery";
import {useAppSelector} from "../../hooks/redux";
import {IOrder} from "../../models/iOrders";
import {MachineryStatus} from "utils/const";

const collator = new Intl.Collator("ru");

export const getMachinery = (state: RootState): IMachinery[] => {
    const arr = [...state.machinery.list];
    return arr.sort((a, b) => {
        const nameA = a.brand.toLowerCase();
        const nameB = b.brand.toLowerCase();
        return collator.compare(nameA, nameB);
    });
};
export const getMachineryById = (state: RootState, machineryId: string): IMachinery[] => {
    return state.machinery.list.filter((machinery) => machinery.id === machineryId);
};
export const getMachineryByType = (state: RootState,
                                   machineryType: string,
                                   isGetDisActive: boolean): IMachinery[] => {
    const list = state.machinery.list.filter((machinery) => machinery.type === machineryType).sort((a, b) => {
        return a.brand.toLowerCase().localeCompare(b.brand.toLowerCase(), 'ru');
    });
    if (isGetDisActive) return list;
    return list.filter(machinery => !machinery.status || machinery.status !== MachineryStatus.disActive)
};
export const getRelatedMachineryByInvoiceId = (state: RootState, invoiceId: string): IMachinery[] => {
    const relatedMachinery: IMachinery[] = [];
    const relatedOrders: IOrder[] = [];
    state.orders.list.forEach((order) => {
        const include = order.orderItems.some((orderItems) => orderItems.invoiceId && orderItems.invoiceId === invoiceId);
        if (include) {
            relatedOrders.push(order);
        }
    });
    if (relatedOrders.length > 0) {
        const relatedMachineryIds: string[] = [];
        relatedOrders.forEach((relatedOrder) => {
            if (relatedOrder.machineryId && relatedOrder.machineryId.length > 0) {
                relatedMachineryIds.push(relatedOrder.machineryId);
            }
        });
        if (relatedMachineryIds.length > 0) {
            relatedMachineryIds.forEach((relatedMachineryId) => {
                const machinery = useAppSelector((state) => getMachineryById(state, relatedMachineryId));
                relatedMachinery.push(machinery[0]);
            });
        }
    }
    return relatedMachinery;
};
