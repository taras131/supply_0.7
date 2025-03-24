import {RootState} from "../../../store";

export const getTasks = (state: RootState) => {
    return state.tasks.list;
};

export const getCurrentTask = (state: RootState) => {
    return state.tasks.currentTask;
};

export const getTaskById = (state: RootState, taskId: number) => {
    return state.tasks.list.find(task => task.id === taskId);
};

export const getTaskIsLoading = (state: RootState) => {
    return state.tasks.isLoading;
};