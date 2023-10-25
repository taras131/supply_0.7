import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import InvoicesReducer from "./reducers/invoices";
import SuppliersReducer from "./reducers/suppliers";
import MessageReducer from "./reducers/message";
import authReducer from "./reducers/auth";
import commentsReducer from "./reducers/coments";
import shipmentsReducer from "./reducers/shipment";

const rootReducer = combineReducers({
    invoices: InvoicesReducer,
    suppliers: SuppliersReducer,
    message: MessageReducer,
    auth: authReducer,
    comments: commentsReducer,
    shipments: shipmentsReducer,

});
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];