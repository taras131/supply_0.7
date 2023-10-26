import React, {FC} from "react";
import {IShipments} from "../models/iShipments";
import ShipmentHeader from "./ShipmentHeader";
import AccordionWithTitleCounterIcon from "./AccordionWithTitleCounterIcon";
import {shipmentPanelId, PRIMARY} from "../utils/const";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

interface IProps {
    shipments: IShipments []
    expanded: string | false
    handleExpandedChange: any
}

const InvoiceDetailsShipment: FC<IProps> = ({shipments, expanded, handleExpandedChange}) => {
    const shipmentsList = shipments.map(shipment => (<ShipmentHeader key={shipment.id} shipment={shipment}/>));
    return (
        <AccordionWithTitleCounterIcon title={"Отгрузки"} count={shipments.length} expanded={expanded}
                                       panelId={shipmentPanelId}
                                       handleExpandedChange={handleExpandedChange}
                                       icon={<LocalShippingIcon color={PRIMARY}/>}>
            <Stack spacing={3}>
                <>
                    <Divider/>
                    {shipmentsList}
                </>
            </Stack>
        </AccordionWithTitleCounterIcon>
    );
};

export default InvoiceDetailsShipment;