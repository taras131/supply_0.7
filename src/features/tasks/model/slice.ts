import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask} from "../../../models/ITasks";
import {fetchAddTask, fetchGetTaskById, fetchGetTasks, fetchUpdateTask} from "./actions";

interface ITasksState {
    list: (ITask)[];
    currentTask: ITask | null;
    isLoading: boolean;
    errorMessage: string;
    wsConnected: boolean,
    wsMessage: string | null,
}

const initialState: ITasksState = {
    list: [],
    currentTask: null,
    isLoading: false,
    errorMessage: "",
    wsConnected: false,
    wsMessage: null,
};

const handlePending = (state: ITasksState) => {
    state.isLoading = true;
    state.errorMessage = "";
};

const handleRejected = (state: ITasksState, action: any) => {
    state.isLoading = false;
    state.errorMessage = action.payload as string;
};

export const TasksSlice = createSlice({
        name: "tasks",
        initialState,
        reducers: {
            updateTasksList: (state, action: PayloadAction<ITask[]>) => {
                state.list = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchGetTasks.fulfilled, (state, action: PayloadAction<ITask []>) => {
                    state.list = action.payload;
                    state.isLoading = false;
                })
                .addCase(fetchGetTaskById.pending, (state) => {
                    state.currentTask = null;
                    state.isLoading = true;
                })
                .addCase(fetchGetTaskById.fulfilled, (state, action: PayloadAction<ITask>) => {
                    state.currentTask = action.payload;
                    state.isLoading = false;
                })
                .addCase(fetchAddTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                    state.list = [...state.list, action.payload];
                    state.isLoading = false;
                })
                .addCase(fetchUpdateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                    state.list = [...state.list.map(task => task.id === action.payload.id ? action.payload : task)];
                    state.currentTask = action.payload;
                    state.isLoading = false;
                })
                .addMatcher(
                    (action) => action.type.endsWith("/pending"),
                    handlePending
                )
                .addMatcher(
                    (action) => action.type.endsWith("/rejected"),
                    handleRejected
                );
        },

    })
;

export const {updateTasksList} = TasksSlice.actions;
export default TasksSlice.reducer;