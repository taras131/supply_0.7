import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INewShipments, IReceiving, Shipments, Transporter, TShipmentsType} from "models/iShipments";
import {ALL, shipmentTypes} from "utils/const";
import {RootState} from "store";
import {shipmentsAPI} from "features/shipments/api";
import {handlerError} from "store/actionsCreators/handleError";

interface IShipmentsState {
    list: Shipments[];
    isLoading: boolean;
    errorMessage: string;
    transporterFilter: Transporter | typeof ALL;
    shipmentTypeFilter: TShipmentsType | typeof ALL;
    search: string;
}

const initialState: IShipmentsState = {
    list: [],
    isLoading: false,
    errorMessage: "",
    transporterFilter: ALL,
    shipmentTypeFilter: ALL,
    search: "",
};

export const fetchAddShipment = createAsyncThunk("fetch_add_shipment", async (shipment: INewShipments, ThunkAPI) => {
    try {
        return await shipmentsAPI.addShipment(shipment);
    } catch (e) {
        return ThunkAPI.rejectWithValue(handlerError(e));
    }
});

export interface ReceivingData {
    shipmentId: string;
    newReceiving: IReceiving;
}

export const fetchUpdateShipmentReceiving = createAsyncThunk(
    "update_shipment_receiving",
    async (updateReceivingData: IReceivingData, ThunkAPI) => {
        try {
            return  await shipmentsAPI.updateReceiving(updateReceivingData);
        } catch (e) {
            return ThunkAPI.rejectWithValue(handlerError(e));
        }
    },
);

export const ShipmentSlice = createSlice({
    name: "shipments",
    initialState,
    reducers: {
        setShipments: (state, action: PayloadAction<Shipments[]>) => {
            state.list = action.payload;
        },
        setShipmentsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setTransporterFilter: (state, action: PayloadAction<Transporter | typeof ALL>) => {
            state.transporterFilter = action.payload;
        },
        setShipmentTypeFilter: (state, action: PayloadAction<TShipmentsType | typeof ALL>) => {
            state.shipmentTypeFilter = action.payload;
        },
        setShipmentSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
    extraReducers: {},
});

const selectShipmentsState = (state: RootState) => state.shipments;
const selectShipmentsList = (state: RootState) => state.shipments.list;
export const selectShipments = createSelector([selectShipmentsState], (shipmentsState) => {
    let filteredShipments = [...shipmentsState.list];
    if (shipmentsState.transporterFilter !== ALL) {
        filteredShipments = filteredShipments.filter(
            (shipment) => shipment.transporter === shipmentsState.transporterFilter,
        );
    }
    if (shipmentsState.shipmentTypeFilter !== ALL) {
        filteredShipments = filteredShipments.filter((shipment) => shipment.type === shipmentsState.shipmentTypeFilter);
    }
    if (shipmentsState.search !== "") {
        filteredShipments = filteredShipments.filter((shipment) => shipment.ladingNumber.includes(shipmentsState.search));
    }
    return filteredShipments.sort((a, b) => {
        return b.author.dateCreating - a.author.dateCreating;
    });
});
export const selectShipmentsByInvoiceId = (invoiceId: string) =>
    createSelector([selectShipmentsList], (shipmentsList: Shipments[]) => {
        return shipmentsList.filter((shipment) => shipment.invoicesList.some((invoice) => invoice.invoiceId === invoiceId));
    });
export const selectTransporterFilter = createSelector(
    [selectShipmentsState],
    (shipmentsState) => shipmentsState.transporterFilter,
);
export const selectShipmentTypeFilter = createSelector(
    [selectShipmentsState],
    (shipmentsState) => shipmentsState.shipmentTypeFilter,
);
export const selectShipmentSearch = createSelector([selectShipmentsState], (shipmentsState) => shipmentsState.search);
export const selectIsShipmentByInvoiceId = (invoiceId: string) =>
    createSelector([selectShipmentsState], (shipmentsState) => {
        let isShipment = false;
        shipmentsState.list.forEach((shipment) => {
            shipment.invoicesList.forEach((invoice) => {
                if (invoice.invoiceId === invoiceId) {
                    isShipment = true;
                }
            });
        });
        return isShipment;
    });
export const selectNumberAirShipmentsRoute = createSelector(
    [selectShipmentsState],
    (shipmentsState) => shipmentsState.isLoading);
export const selectNumberRailShipmentsRoute = createSelector(
    [selectShipmentsList],
    (shipmentsList) =>
        shipmentsList.filter((shipment) => !shipment.receiving.isReceived && shipment.type === shipmentTypes[1].name)
            .length,
);
export const selectShipmentsIsLoading = createSelector(
    [selectShipmentsList],
    (shipmentsList) =>
        shipmentsList.filter((shipment) => !shipment.receiving.isReceived && shipment.type === shipmentTypes[1].name)
            .length,
);

export const {setShipments, setShipmentsLoading, setTransporterFilter, setShipmentTypeFilter, setShipmentSearch} =
    ShipmentSlice.actions;

export default ShipmentSlice.reducer;
