import React from "react";
import ShipmentsListItem from "./ShipmentsListItem";
import {useAppSelector} from "../hooks/redux";
import {getShipments} from "../store/selectors/shipments";

const ShipmentsList = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const shipments = useAppSelector(state => getShipments(state));
    const shipmentsList = shipments.map(shipment => (<ShipmentsListItem key={shipment.id}
                                                                        shipment={shipment}
                                                                        handleChange={handleChange(shipment.id)}
                                                                        expanded={expanded}
    />));
    return (
        <div style={{maxWidth: "900px", width: "100%",marginTop: "20px"}}>
            {shipmentsList}
        </div>
    );
};

export default ShipmentsList;