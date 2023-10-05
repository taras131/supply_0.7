import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import InvoicesReducer from "./reducers/invoices";
import SuppliersReducer from "./reducers/suppliers"
import MessageReducer from "./reducers/message"


const rootReducer = combineReducers({
    invoices: InvoicesReducer,
    suppliers: SuppliersReducer,
    message: MessageReducer
});
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];