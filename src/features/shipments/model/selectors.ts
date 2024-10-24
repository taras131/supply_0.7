import {RootState} from "store";
import {createSelector} from "@reduxjs/toolkit";
import {ALL, shipmentTypes} from "utils/const";
import {Shipments} from "models/iShipments";

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
    [selectShipmentsList],
    (shipmentsList) => shipmentsList.filter((shipment) => !shipment.receiving.isReceived && shipment.type === shipmentTypes[0].name)
        .length,);
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