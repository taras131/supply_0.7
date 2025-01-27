import {RootState} from "../../../store";
import {ICurrentMachinery, IMachinery, IMachineryDoc} from "../../../models/iMachinery";
import {useAppSelector} from "../../../hooks/redux";
import {IOrder} from "../../../models/iOrders";
import {MachineryStatus} from "utils/const";
import {ITask} from "../../../models/ITasks";

const collator = new Intl.Collator("ru");

export const getMachineryIsLoading = (state: RootState): boolean => {
    return state.machinery.isLoading;
};

export const getMachinery = (state: RootState): (IMachinery | ICurrentMachinery)[] => {
    const arr = state.machinery.list.filter(machinery => !machinery.status || machinery.status === MachineryStatus.active);
    return arr.sort((a, b) => {
        const nameA = a.brand.toLowerCase();
        const nameB = b.brand.toLowerCase();
        return collator.compare(nameA, nameB);
    });
};
export const getMachineryById = (state: RootState, machineryId: number): IMachinery | ICurrentMachinery => {
    return state.machinery.list.filter(machinery => machinery.id !== machineryId)[0];
};

export const getMachineryByTypeId = (state: RootState, typeId: number) => {
    return state.machinery.list.filter((machinery) => machinery.type_id === typeId);
};

export const getCurrentMachinery = (state: RootState): ICurrentMachinery | null => {
    return state.machinery.currentMachinery;
};

export const getCurrentMachineryDocs = (state: RootState): IMachineryDoc[] | null => {
    return state.machinery.currentMachinery?.docs || null;
};

export const getCurrentMachineryId = (state: RootState): number | null => {
    return state.machinery.currentMachinery?.id || null;
};

export const getCurrentMachineryTasks = (state: RootState): ITask [] | [] => {
    return state.machinery.currentMachinery?.tasks || [];
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
                const machinery = useAppSelector((state) => getMachineryById(state, +relatedMachineryId));
                relatedMachinery.push(machinery[0]);
            });
        }
    }
    return relatedMachinery;
};


