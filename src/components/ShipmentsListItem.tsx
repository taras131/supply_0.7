import React, {FC} from "react";
import {IShipments} from "../models/iShipments";
import {Accordion, AccordionDetails, AccordionSummary, Chip, Stack, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {convertMillisecondsToDate} from "../utils/services";
import ShipmentsListItemInvoice from "./ShipmentsListItemInvoice";
import List from "@mui/material/List";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import DownloadIcon from "@mui/icons-material/Download";

interface IProps {
    shipment: IShipments
    handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
    expanded: string | false
}

const ShipmentsListItem: FC<IProps> = ({shipment, handleChange, expanded}) => {
    const invoicesList = shipment.invoicesList.map(shipmentInvoice => <ShipmentsListItemInvoice key={shipmentInvoice.id}
                                                                                                shipmentInvoice={shipmentInvoice}/>);
    return (
        <Accordion expanded={expanded === shipment.id} onChange={handleChange} sx={{width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Stack sx={{width: "100%"}} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography sx={{flexShrink: 0}} fontWeight={600}>
                        {convertMillisecondsToDate(shipment.author.dateCreating)}
                    </Typography>
                    <Typography sx={{flexShrink: 0}} fontWeight={600}>
                        {shipment.transporter}
                    </Typography>
                    <Typography sx={{flexShrink: 0}} fontWeight={600}>
                        Накладная № {shipment.ladingNumber}
                    </Typography>
                    {shipment.type === "air"
                        ? (<AirplanemodeActiveIcon sx={{marginRight: "16px"}}/>)
                        : (<DirectionsSubwayIcon sx={{marginRight: "16px"}}/>)}
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{width: "100%"}}>
                    {invoicesList}
                </List>
                <Stack sx={{width: "250px", marginTop: "36px"}}>
                    <Chip
                        label={"Транспортная накладная"}
                        component="a"
                        href={shipment.ladingNumberFilePath}
                        icon={<DownloadIcon/>}
                        color={"primary"}
                        clickable
                    />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default ShipmentsListItem;