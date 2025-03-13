import {RootState} from "../../../store";
import {ICurrentMachinery, IMachinery, IMachineryDoc} from "../../../models/iMachinery";
import {useAppSelector} from "../../../hooks/redux";
import {IOrder} from "../../../models/iOrders";
import {MachineryStatus} from "utils/const";
import {ITask} from "../../../models/ITasks";
import problems from "../ui/problems/Problems";
import {IProblem} from "../../../models/IProblems";

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

export const getCurrentMachineryTitle = (state: RootState): string => {
    const currentMachinery = getCurrentMachinery(state);
    if (currentMachinery) {
        return `${currentMachinery.brand} ${currentMachinery.model}`;
    } else {
        return "";
    }
};
export const getCurrentMachineryOperatingTypeId = (state: RootState): number | null => {
    return state.machinery.currentMachinery?.operating_type_id || null;
};

export const getProblemById = (state: RootState, problemId: number): IProblem | null => {
    return state.machinery.currentMachinery?.problems.find(problem => problem.id === problemId) || null;
};

export const getActiveProblems = (state: RootState, problemId: number | undefined) => {
    return state.machinery.currentMachinery?.problems.filter(problem => problem.status_id !== 4 || problem.id === problemId) || [];
};

export const getProblemTitleById = (state: RootState, problemId: number | undefined) => {
    return state.machinery.currentMachinery?.problems.find(problem => problem.id === problemId)?.title || "";
};

export const getCurrentMachineryId = (state: RootState): number | null => {
    return state.machinery.currentMachinery?.id || null;
};

export const getCurrentMachineryTasks = (state: RootState): ITask [] | [] => {
    return state.machinery.currentMachinery?.tasks || [];
};

export const getCurrentMachineryProblems = (state: RootState): IProblem [] | [] => {
    return state.machinery.currentMachinery?.problems || [];
};

export const getTaskById = (state: RootState, taskId: number): ITask | null => {
    return state.machinery.currentMachinery?.tasks.find(task => task.id === taskId) || null;
};

export const getLastMaintenance = (state: RootState): ITask | null => {
    const tasks = state.machinery.currentMachinery?.tasks;
    if (!tasks) return null;
    const filteredTasks = tasks.filter(task => task.status_id === 3 && task.type_id === 1);
    if (filteredTasks.length === 0) return null;
    return filteredTasks.reduce(
        (latestTask, currentTask) =>
            currentTask.due_date > latestTask.due_date ? currentTask : latestTask,
        filteredTasks[0]
    );
};

export const getUpcomingMaintenance = (state: RootState): ITask | null => {
    // Получаем список задач текущей техники
    const tasks = state.machinery.currentMachinery?.tasks;
    if (!tasks) return null;

    // Фильтруем задачи по условиям: status_id (1 или 2) и type_id (1)
    const filteredTasks = tasks.filter(
        task => (task.status_id === 1 || task.status_id === 2) &&
            task.type_id === 1
    );
    if (filteredTasks.length === 0) return null;

    // Ищем задачу с минимальным значением due_date (ближайшую)
    return filteredTasks.reduce(
        (nearestTask, currentTask) =>
            currentTask.due_date < nearestTask.due_date ? currentTask : nearestTask,
        filteredTasks[0]
    );
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


