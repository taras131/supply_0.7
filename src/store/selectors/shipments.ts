import {RootState} from "../index";
import {IShipments} from "../../models/iShipments";

export const getShipments = (state: RootState): IShipments[] => {
    return state.shipments.list;
};
export const getShipmentsIsLoading = (state: RootState): boolean => {
    return state.shipments.isLoading;
};
export const getShipmentsByInvoiceId = (state: RootState, invoiceId: string): IShipments[] => {
    const shipments: IShipments[] = [];
    state.shipments.list.forEach(shipment => {
        shipment.invoicesList.forEach(invoice => {
           if(invoice.invoiceId === invoiceId) shipments.push(shipment);
        });
    });
    return shipments;
};
export const getIsShipmentByInvoiceId = (state: RootState, invoiceId: string): boolean => {
    let isShipment = false;
    state.shipments.list.forEach(shipment => {
        shipment.invoicesList.forEach(invoice => {
            if(invoice.invoiceId === invoiceId) {
                isShipment = true
            }
        });
    });
    return isShipment;
};