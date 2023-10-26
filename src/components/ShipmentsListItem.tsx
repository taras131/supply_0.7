import React, {FC, useId} from "react";
import {IShipments} from "../models/iShipments";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Chip,
    FormControlLabel, Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {convertMillisecondsToDate, getDateInMilliseconds, getProjectedArrivalDate} from "../utils/services";
import ShipmentsListItemInvoice from "./ShipmentsListItemInvoice";
import List from "@mui/material/List";
import DownloadIcon from "@mui/icons-material/Download";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUpdateShipmentReceiving} from "../store/actionsCreators/shipments";
import {getUser, getUserFullNameById} from "../store/selectors/auth";
import ShipmentHeader from "./ShipmentHeader";

interface IProps {
    shipment: IShipments
    handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
    expanded: string | false
}

const ShipmentsListItem: FC<IProps> = ({shipment, handleChange, expanded}) => {
    const dispatch = useAppDispatch();
    const checkboxId = useId();
    const user = useAppSelector(state => getUser(state));
    const receivingUserFullName = useAppSelector(state => getUserFullNameById(state, shipment.receiving.userId));
    const projectedArrivalDate = getProjectedArrivalDate(shipment.author.dateCreating, shipment.type);
    const invoicesList = shipment.invoicesList.map(shipmentInvoice => <ShipmentsListItemInvoice
        key={shipmentInvoice.invoiceId}
        shipmentInvoice={shipmentInvoice}/>);
    const handleReceivingChange = () => {
        if (shipment.receiving && shipment.receiving.isReceived) {
            dispatch(fetchUpdateShipmentReceiving({
                shipmentId: shipment.id,
                newReceiving: {
                    userId: "",
                    dateCreating: 0,
                    isReceived: false,
                },
            }));
        } else {
            dispatch(fetchUpdateShipmentReceiving({
                shipmentId: shipment.id,
                newReceiving: {
                    userId: user.id,
                    dateCreating: getDateInMilliseconds(),
                    isReceived: true,
                },
            }));
        }
    };
    return (
        <Accordion expanded={expanded === shipment.id} onChange={handleChange} sx={{width: "100%"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{backgroundColor: shipment.receiving.isReceived ? "#00CC66" : "white"}}
            >
                <ShipmentHeader shipment={shipment}/>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{width: "100%"}}>
                    {invoicesList}
                </List>
                <Stack sx={{width: "100%", marginTop: "36px"}}
                       direction={"row"}
                       alignItems={"center"}
                       spacing={2}
                       justifyContent={"space-between"}>
                    <Chip
                        label={"Транспортная накладная"}
                        component="a"
                        href={shipment.ladingNumberFilePath}
                        icon={<DownloadIcon/>}
                        color={"primary"}
                        clickable
                    />
                    <Typography>
                        {shipment.receiving && shipment.receiving.isReceived
                            ? `${convertMillisecondsToDate(shipment.receiving.dateCreating)} ${receivingUserFullName}`
                            : `Прогноз прибытия: ${projectedArrivalDate}`}

                    </Typography>
                    <FormControlLabel
                        label={"Получен"}
                        labelPlacement={"start"}
                        control={<Checkbox checked={shipment.receiving && shipment.receiving.isReceived}
                                           onChange={handleReceivingChange}
                                           color={"primary"}
                                           id={checkboxId}
                                           sx={{"& .MuiSvgIcon-root": {fontSize: 38}}}/>}/>


                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default ShipmentsListItem;