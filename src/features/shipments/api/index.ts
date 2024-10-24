import {INewShipments} from "models/iShipments";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {ReceivingData} from "features/shipments/model/slice";

export const shipmentsAPI = {
    addShipment: async (shipment: INewShipments) => {
        return await addDoc(collection(db, "shipments"), shipment);
    },
    updateReceiving: async (updateReceivingData: ReceivingData) => {
        return await updateDoc(doc(db, "shipments", updateReceivingData.shipmentId), {
            receiving: {
                userId: updateReceivingData.newReceiving.userId,
                dateCreating: updateReceivingData.newReceiving.dateCreating,
                isReceived: updateReceivingData.newReceiving.isReceived,
            },
        });
    },
};