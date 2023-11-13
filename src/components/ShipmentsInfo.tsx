import React from "react";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getNumberAirShipmentsRoute, getNumberRailShipmentsRoute} from "../store/selectors/shipments";
import {CENTER, COLUMN, ROW, SPACE_BETWEEN, START} from "../styles/const";

const ShipmentsInfo = () => {
    const numberAirShipmentsRoute = useAppSelector(state => getNumberAirShipmentsRoute(state));
    const numberRailShipmentsRoute = useAppSelector(state => getNumberRailShipmentsRoute(state));
    const matches_500 = useMediaQuery("(min-width:500px)");
    const matches_400 = useMediaQuery("(min-width:400px)");
    return (
        <Stack sx={{maxWidth: 1000, width: "100%"}}
               direction={matches_400 ? ROW : COLUMN}
               alignItems={matches_400 ? CENTER : START}
               justifyContent={START}
               spacing={2}>
            <Stack direction={ROW} spacing={1}>
                <Typography color={"gray"}
                            fontSize={matches_500 ? "16px" : "12px"}
                            fontWeight={matches_500 ? 600 : 500}>
                    Авиа грузов в пути:
                </Typography>
                <Typography color={"darkblue"}
                            fontSize={matches_500 ? "16px" : "12px"}
                            fontWeight={matches_500 ? 600 : 500}>
                    {numberAirShipmentsRoute}.
                </Typography>
            </Stack>
            <Stack direction={ROW} spacing={1}>
                <Typography color={"gray"}
                            fontSize={matches_500 ? "16px" : "12px"}
                            fontWeight={matches_500 ? 600 : 500}>
                    ЖД грузов в пути:</Typography>
                <Typography color={"darkblue"}
                            fontSize={matches_500 ? "16px" : "12px"}
                            fontWeight={matches_500 ? 600 : 500}>
                    {numberRailShipmentsRoute}.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default ShipmentsInfo;