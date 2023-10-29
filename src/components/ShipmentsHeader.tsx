import React from "react";
import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import AddIcon from "@mui/icons-material/Add";


const ShipmentsHeader = () => {
    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate(routes.addNewShipments);
    };
    return (
        <Stack sx={{maxWidth: "900px", width: "100%"}}
               direction={"row"}
               alignItems={"center"}
               justifyContent={"space-between"}>
            <Typography variant="h2" fontSize="24px" fontWeight={700}>
                Отгрузки:
            </Typography>
            <Button startIcon={<AddIcon/>} variant="contained" size="large" onClick={handleAddClick}>
                Отгрузка
            </Button>
        </Stack>
    );
};

export default ShipmentsHeader;