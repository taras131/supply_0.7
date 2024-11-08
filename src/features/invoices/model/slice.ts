import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IInvoice} from "models/iInvoices";
import {ISelectedOrderPosition} from "models/iOrders";
import {RootState} from "store";

interface ISelectedOrderPositionData {
    orderId: string;
    positionId: number;
}

interface ICommentsState {
    list: IInvoice[];
    isLoading: boolean;
    errorMessage: string;
    selectedPosition: ISelectedOrderPosition;
}

const initialState: ICommentsState = {
    list: [],
    isLoading: false,
    errorMessage: "",
    selectedPosition: {},
};

export const InvoicesSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        setInvoices: (state, action: PayloadAction<IInvoice[]>) => {
            state.list = action.payload;
        },
        setSelectedOrderPosition: (state, action: PayloadAction<ISelectedOrderPositionData>) => {
            const {orderId, positionId} = action.payload;
            if (state.selectedPosition[orderId]) {
                if (state.selectedPosition[orderId].find((item) => item === positionId)) {
                    state.selectedPosition = {
                        ...state.selectedPosition,
                        [orderId]: [...state.selectedPosition[orderId].filter((item) => item !== positionId)],
                    };
                } else {
                    state.selectedPosition = {
                        ...state.selectedPosition,
                        [orderId]: [...state.selectedPosition[orderId], positionId],
                    };
                }
            } else {
                state.selectedPosition = {...state.selectedPosition, [orderId]: [positionId]};
            }
        },
        resetSelectedOrderPosition: (state) => {
            state.selectedPosition = {};
        },
    },

    extraReducers: {},
});

// const selectInvoicesState = (state: RootState) => state.invoices;
const selectInvoicesList = (state: RootState) => state.invoices.list;
export const selectInvoices = createSelector([selectInvoicesList], (invoicesList) => {
    const arr = [...invoicesList];
    return arr.sort((a, b) => {
        return b.author.date - a.author.date;
    });
});
/*export const selectInvoiceById = (invoiceId: string) =>
    createSelector([selectInvoicesList], (invoicesList) => {
        return invoicesList.filter((invoice) => invoice.id === invoiceId)[0];
    });
export const selectInvoicesByIds = (invoiceShipments: IShipmentsInvoice[]) =>
    createSelector([selectInvoicesState], (invoicesState) => {
        const arr: IInvoice[] = [];
        invoiceShipments.forEach((invoiceShipment) => {
            arr.push({...selectInvoiceById(invoiceShipment.invoiceId), volume: invoiceShipment.volume});
        });
        return arr;
    });*/

export const {setInvoices, setSelectedOrderPosition, resetSelectedOrderPosition} = InvoicesSlice.actions;

export default InvoicesSlice.reducer;