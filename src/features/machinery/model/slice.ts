import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICurrentMachinery, IMachinery, IMachineryDoc} from "../../../models/iMachinery";
import {
    fetchAddMachinery,
    fetchAddMachineryComment,
    fetchAddMachineryDoc, fetchAddMachineryProblem, fetchAddMachineryTask,
    fetchDeleteMachineryComment,
    fetchDeleteMachineryPhoto,
    fetchGetMachineryById,
    fetchUpdateMachinery,
    fetchUpdateMachineryComment, fetchUpdateMachineryProblem, fetchUpdateMachineryTask,
    fetchUploadMachineryPhoto,
} from "./actions";
import {IComment} from "../../../models/iComents";
import {ITask} from "../../../models/ITasks";
import {IProblem} from "../../../models/IProblems";

interface IMachineryState {
    list: (IMachinery)[];
    currentMachinery: ICurrentMachinery | null;
    isLoading: boolean;
    errorMessage: string;
    wsConnected: boolean,
    wsMessage: string | null,
}

const initialState: IMachineryState = {
    list: [],
    currentMachinery: null,
    isLoading: false,
    errorMessage: "",
    wsConnected: false,
    wsMessage: null,
};

const handlePending = (state: IMachineryState) => {
    state.isLoading = true;
    state.errorMessage = "";
};

const handleRejected = (state: any, action: any) => {
    state.isLoading = false;
    state.errorMessage = action.payload as string;
};

export const MachinerySlice = createSlice({
    name: "machinery",
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
            console.log(action.payload);
        },
        updateMachinery(state, action: PayloadAction<IMachinery | ICurrentMachinery>) {
            state.list = state.list.map((machinery) =>
                machinery.id === action.payload.id ? action.payload : machinery
            );
        },
        updateMachineryList: (state, action: PayloadAction<IMachinery[]>) => {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddMachinery.fulfilled, (state, action: PayloadAction<IMachinery>) => {
                state.isLoading = false;
            })
            .addCase(fetchGetMachineryById.fulfilled, (state, action: PayloadAction<ICurrentMachinery>) => {
                state.isLoading = false;
                state.currentMachinery = action.payload;
            })
            .addCase(fetchUpdateMachinery.fulfilled, (state, action: PayloadAction<ICurrentMachinery>) => {
                state.isLoading = false;
                state.currentMachinery = action.payload;
            })
            .addCase(fetchAddMachineryComment.fulfilled, (state, action: PayloadAction<IComment>) => {
                state.isLoading = false;
                if (state.currentMachinery && state.currentMachinery.comments) {
                    state.currentMachinery = {
                        ...state.currentMachinery,
                        comments: [...state.currentMachinery.comments, action.payload],
                    };
                }
            })
            .addCase(fetchDeleteMachineryComment.fulfilled, (state, action: PayloadAction<number>) => {
                state.isLoading = false;
                if (state.currentMachinery && state.currentMachinery.comments) {
                    state.currentMachinery = {
                        ...state.currentMachinery, comments: [...state.currentMachinery.comments
                            .filter(comment => comment.id !== action.payload)],
                    };
                }
                state.list = [...state.list.map(machinery => {
                    if (machinery.comments && machinery.comments.length > 0) {
                        return {
                            ...machinery,
                            comments: [...machinery.comments.filter(comment => comment.id !== action.payload)],
                        };
                    } else {
                        return machinery;
                    }
                })];
            })
            .addCase(fetchUpdateMachineryComment.fulfilled, (state, action: PayloadAction<IComment>) => {
                state.isLoading = false;
                if (state.currentMachinery && state.currentMachinery.comments) {
                    state.currentMachinery = {
                        ...state.currentMachinery, comments: [...state.currentMachinery.comments.map(comment => {
                            if (action.payload.id === comment.id) {
                                return action.payload;
                            } else {
                                return comment;
                            }
                        })],
                    };
                }
            })
            .addCase(fetchUploadMachineryPhoto.fulfilled, (state, action: PayloadAction<ICurrentMachinery>) => {
                state.isLoading = false;
                state.currentMachinery = action.payload;
            })
            .addCase(fetchDeleteMachineryPhoto.fulfilled, (state, action: PayloadAction<ICurrentMachinery>) => {
                state.isLoading = false;
                state.currentMachinery = action.payload;
            })
            .addCase(fetchAddMachineryDoc.fulfilled, (state, action: PayloadAction<IMachineryDoc>) => {
                if (state.currentMachinery && state.currentMachinery.docs) {
                    state.currentMachinery = {
                        ...state.currentMachinery,
                        docs: [...state.currentMachinery.docs, action.payload],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchAddMachineryTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                if (state.currentMachinery && action.payload.machinery_id) {
                    state.currentMachinery = {
                        ...state.currentMachinery,
                        tasks: [...state.currentMachinery.tasks, action.payload],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchUpdateMachineryTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                if (state.currentMachinery) {
                    state.currentMachinery = {
                        ...state.currentMachinery,
                        tasks: [...state.currentMachinery.tasks.map(task => task.id === action.payload.id ? action.payload : task)],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchAddMachineryProblem.fulfilled, (state, action: PayloadAction<IProblem>) => {
                if (state.currentMachinery && action.payload.machinery_id) {
                    state.currentMachinery = {
                        ...state.currentMachinery,
                        problems: [...state.currentMachinery.problems, action.payload],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchUpdateMachineryProblem.fulfilled, (state, action: PayloadAction<IProblem>) => {
                if (state.currentMachinery && state.currentMachinery.problems) {
                    console.log("fetchUpdateMachineryProblem "+action.payload.photos.length);
                    state.currentMachinery = {
                        ...state.currentMachinery,
                        problems: [...state.currentMachinery.problems.map(problem => problem.id === action.payload.id
                            ? action.payload
                            : problem)],
                    };
                }
                state.isLoading = false;
            })
            .addCase(fetchDeleteMachineryPhoto.rejected, handleRejected)
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

export const {updateMachineryList, wsConnected, wsDisconnected, wsMessageReceived} = MachinerySlice.actions;
export default MachinerySlice.reducer;
