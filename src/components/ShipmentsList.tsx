import React, {FC} from "react";
import ShipmentsListItem from "./ShipmentsListItem";
import {useAppSelector} from "../hooks/redux";
import {getShipments} from "../store/selectors/shipments";
import {IShipments} from "../models/iShipments";

interface IProps {
    shipments: IShipments[]
    extendShipmentId?: string | false
}

const ShipmentsList: FC<IProps> = ({shipments, extendShipmentId = false}) => {
    const [expanded, setExpanded] = React.useState<string | false>(extendShipmentId);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const shipmentsList = shipments.map(shipment => (<ShipmentsListItem key={shipment.id}
                                                                        shipment={shipment}
                                                                        handleChange={handleChange(shipment.id)}
                                                                        expanded={expanded}
    />));
    return (
        <div style={{width: "100%"}}>
            {shipmentsList}
        </div>
    );
};

export default ShipmentsList;