import React from "react";
import {Stack, Typography} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getNumberAirShipmentsRoute, getNumberRailShipmentsRoute} from "../store/selectors/shipments";

const ShipmentsInfo = () => {
    const numberAirShipmentsRoute = useAppSelector(state => getNumberAirShipmentsRoute(state));
    const numberRailShipmentsRoute = useAppSelector(state => getNumberRailShipmentsRoute(state));
    return (
        <Stack sx={{maxWidth: 1000, width: "100%"}} direction="row" alignItems="center"
               justifyContent="space-between">
            <Stack direction="row" spacing={1}>
                <Typography color={"gray"}>Авиа грузов в пути:</Typography>
                <Typography color={"darkblue"} fontSize="16px" fontWeight={600}>{numberAirShipmentsRoute}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Typography color={"gray"}>ЖД грузов в пути:</Typography>
                <Typography color={"darkblue"} fontSize="16px" fontWeight={600}>
                    {new Intl.NumberFormat("ru-RU").format(numberRailShipmentsRoute)} руб.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default ShipmentsInfo;