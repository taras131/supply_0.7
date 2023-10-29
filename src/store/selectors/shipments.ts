import {RootState} from "../index";
import {IShipments} from "../../models/iShipments";
import {shipmentTypes} from "../../pages/ShipmentsAddNew";

export const getShipments = (state: RootState): IShipments[] => {
    const arr = [...state.shipments.list];
    return arr.sort((a, b) => {
        return b.author.dateCreating - a.author.dateCreating;
    });
};
export const getShipmentsIsLoading = (state: RootState): boolean => {
    return state.shipments.isLoading;
};
export const getShipmentsByInvoiceId = (state: RootState, invoiceId: string): IShipments[] => {
    const shipments: IShipments[] = [];
    state.shipments.list.forEach(shipment => {
        shipment.invoicesList.forEach(invoice => {
            if (invoice.invoiceId === invoiceId) shipments.push(shipment);
        });
    });
    return shipments;
};
export const getIsShipmentByInvoiceId = (state: RootState, invoiceId: string): boolean => {
    let isShipment = false;
    state.shipments.list.forEach(shipment => {
        shipment.invoicesList.forEach(invoice => {
            if (invoice.invoiceId === invoiceId) {
                isShipment = true;
            }
        });
    });
    return isShipment;
};
export const getNumberAirShipmentsRoute = (state: RootState): number => {
    const arr = [...state.shipments.list.filter(shipment => !shipment.receiving.isReceived && shipment.type === shipmentTypes[0].name)];
    return arr.length;
};
export const getNumberRailShipmentsRoute = (state: RootState): number => {
    const arr = [...state.shipments.list.filter(shipment => !shipment.receiving.isReceived && shipment.type === shipmentTypes[1].name)];
    return arr.length;
};