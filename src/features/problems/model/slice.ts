import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProblem} from "../../../models/IProblems";
import {fetchAddProblem, fetchUpdateProblem} from "./actions";

interface IProblemsState {
    list: (IProblem)[];
    currentProblem: IProblem | null;
    isLoading: boolean;
    errorMessage: string;
    wsConnected: boolean,
    wsMessage: string | null,
}

const initialState: IProblemsState = {
    list: [],
    currentProblem: null,
    isLoading: false,
    errorMessage: "",
    wsConnected: false,
    wsMessage: null,
};

const handlePending = (state: IProblemsState) => {
    state.isLoading = true;
    state.errorMessage = "";
};

const handleRejected = (state: IProblemsState, action: any) => {
    state.isLoading = false;
    state.errorMessage = action.payload as string;
};

export const ProblemsSlice = createSlice({
    name: "problems",
    initialState,
    reducers: {
        wsConnected: (state) => {
            state.wsConnected = true;
        },
        wsDisconnected: (state) => {
            state.wsConnected = false;
        },
        wsMessageReceived: (state, action: PayloadAction<any>) => {
            state.wsMessage = action.payload;
        },
        updateProblemsList: (state, action: PayloadAction<IProblem[]>) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddProblem.fulfilled, (state, action: PayloadAction<IProblem>) => {
                state.list = [...state.list, action.payload];
                state.isLoading = false;
            })
            .addCase(fetchUpdateProblem.fulfilled, (state, action: PayloadAction<IProblem>) => {
                state.list = [...state.list.map(problem => problem.id === action.payload.id ? action.payload : problem)];
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
});

export const {wsConnected, wsDisconnected, updateProblemsList} = ProblemsSlice.actions;
export default ProblemsSlice.reducer;