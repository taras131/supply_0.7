import React, {FC, useId} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    convertMillisecondsToDate,
    deleteYearFromString,
    getDateInMilliseconds,
    getProjectedArrivalDate,
} from "utils/services";
import {getCurrentUser} from "features/auth/model/selectors";
import ShipmentHeader from "features/shipments/ui/ShipmentHeader";
import InvoicesList from "features/invoices/ui/InvoicesList";
import {CENTER, END, ROW, SPACE_BETWEEN, START, SUCCESS_GRADIENT} from "styles/const";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {IShipments} from "models/iShipments";
import {fetchUpdateShipmentReceiving} from "features/shipments/model/actions";
import {getInvoicesByIds} from "features/invoices/model/selectors";
import {getUserFullNameById} from "../../users/model/selectors";

interface IProps {
    shipment: IShipments;
    handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
    expanded: string | false;
}

const ShipmentsListItem: FC<IProps> = ({shipment, handleChange, expanded}) => {
    const matches_600 = useMediaQuery("(min-width:600px)");
    const dispatch = useAppDispatch();
    const createdDate = convertMillisecondsToDate(shipment.author.dateCreating);
    const checkboxId = useId();
    const user = useAppSelector(getCurrentUser);
    const receivingUserFullName = useAppSelector((state) => getUserFullNameById(state, +shipment.receiving.userId));
    const projectedArrivalDate = getProjectedArrivalDate(shipment.author.dateCreating, shipment.type);
    const invoices = useAppSelector(state => getInvoicesByIds(state, shipment.invoicesList));
    const handleReceivingChange = () => {
        if (shipment.receiving && shipment.receiving.isReceived) {
            dispatch(
                fetchUpdateShipmentReceiving({
                    shipmentId: shipment.id,
                    newReceiving: {
                        userId: "",
                        dateCreating: 0,
                        isReceived: false,
                    },
                }),
            );
        } else {
            dispatch(
                fetchUpdateShipmentReceiving({
                    shipmentId: shipment.id,
                    newReceiving: {
                        userId: user.id,
                        dateCreating: getDateInMilliseconds(),
                        isReceived: true,
                    },
                }),
            );
        }
    };
    return (
        <Accordion
            expanded={expanded === shipment.id}
            onChange={handleChange}
            sx={{width: "100%", background: shipment.receiving.isReceived ? SUCCESS_GRADIENT : "white"}}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                    paddingLeft: matches_600 ? "16px" : "4px",
                    paddingRight: matches_600 ? "16px" : "4px",
                    margin: 0,
                }}
            >
                <ShipmentHeader shipment={shipment}/>
            </AccordionSummary>
            <AccordionDetails sx={{padding: "0 6px 0 6px"}}>
                <Stack sx={{width: "100%"}} spacing={2}>
                    <Stack
                        direction={ROW}
                        sx={{width: "100%"}}
                        pt={2}
                        justifyContent={shipment.ladingNumberFilePath ? SPACE_BETWEEN : START}
                        alignItems={CENTER}
                        pl={matches_600 ? "16px" : "4px"}
                        pr={matches_600 ? "16px" : "4px"}
                    >
                        <Typography fontWeight={600}>Отгруженные счета:</Typography>
                    </Stack>
                    <InvoicesList invoices={invoices} forShipmentMode={true}/>
                    <Stack direction={ROW} alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                        <Stack direction={ROW} alignItems={CENTER}>
                            <FormControlLabel
                                sx={{padding: 0, margin: 0}}
                                label={"получен"}
                                labelPlacement={END}
                                control={
                                    <Checkbox
                                        checked={shipment.receiving && shipment.receiving.isReceived}
                                        onChange={handleReceivingChange}
                                        color={"primary"}
                                        id={checkboxId}
                                        sx={{"& .MuiSvgIcon-root": {fontSize: 38}}}
                                    />
                                }
                            />

                            {shipment.receiving && shipment.receiving.isReceived && (
                                <Typography pl={1}>
                                    {convertMillisecondsToDate(shipment.receiving.dateCreating)} {receivingUserFullName}
                                </Typography>
                            )}
                        </Stack>
                        {!shipment.receiving ||
                            (!shipment.receiving.isReceived && (
                                <Typography pl={1}>
                                    {matches_600 ? "Прогноз прибытия:" : "Прогноз: "}
                                    {matches_600 ? projectedArrivalDate : deleteYearFromString(projectedArrivalDate)}
                                </Typography>
                            ))}
                        <Typography
                            pr={1}>Отгружен: {matches_600 ? createdDate : deleteYearFromString(createdDate)}</Typography>
                    </Stack>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default ShipmentsListItem;
