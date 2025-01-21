import {createSlice} from "@reduxjs/toolkit";
import {ITask} from "../../../models/ITasks";


const handlePending = (state: IMachineryState) => {
    state.isLoading = true;
    state.errorMessage = "";
};

const handleRejected = (state: any, action: any) => {
    state.isLoading = false;
    state.errorMessage = action.payload as string;
};

interface ITasksState {
    list: ITask[];
    isLoading: boolean;
    errorMessage: string;
}

const initialState: ITasksState  = {
    list: [],
    isLoading: false,
    errorMessage: "",
};

export const TasksSlice = createSlice({
    name: "machinery",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder

            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                handlePending
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                handleRejected
            );
    },
});


export default TasksSlice.reducer;