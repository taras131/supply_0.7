import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import SuppliersReducer from "features/suppliers/model/slice";
import MessageReducer from "./reducers/message";
import InvoicesReducer from "features/invoices/model/slice";
import authReducer from "../features/auth/model/slice";
import commentsReducer from "./reducers/coments";
import shipmentsReducer from "features/shipments/model/slice";
import ordersReducer from "features/orders/model/slice";
import machineryReducer from "../features/machinery/model/slice";
import problemsReducer from "../features/problems/model/slice";
import tasksReducer from "../features/tasks/model/slice";
import usersReducer from "../features/users/model/slice";
import filesReducer from "../features/files/model/slice";
import {machineryWebsocketMiddleware} from "../features/machinery/model/websocketMiddleware";
import {usersWebsocketMiddleware} from "../features/users/model/websocketMiddleware";
import {problemsWebsocketMiddleware} from "../features/problems/model/websocketMiddleware";

const rootReducer = combineReducers({
    invoices: InvoicesReducer,
    suppliers: SuppliersReducer,
    message: MessageReducer,
    auth: authReducer,
    comments: commentsReducer,
    shipments: shipmentsReducer,
    orders: ordersReducer,
    machinery: machineryReducer,
    problems: problemsReducer,
    tasks: tasksReducer,
    users: usersReducer,
    files: filesReducer,
});
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                machineryWebsocketMiddleware,
                usersWebsocketMiddleware,
                problemsWebsocketMiddleware,
            ),
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
