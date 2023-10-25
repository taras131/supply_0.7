import React, {FC} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";

interface IProps {
    isValidate: boolean
    handleAddClick: () => void
}

const ShipmentsAddNewHeader: FC<IProps> = ({isValidate, handleAddClick}) => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(routes.shipments);
    };

    return (
        <Stack sx={{maxWidth: 850, width: "100%", padding: "20px 0"}}
               direction={"row"}
               alignItems={"center"}
               justifyContent={"space-between"}>
            <Button variant="outlined" size="large" onClick={handleBackClick}>
                Назад
            </Button>
            <Typography variant="h2" fontSize="24px" fontWeight={700}>
                Новая отгрузка
            </Typography>
            <Button variant="contained" size="large" onClick={handleAddClick} disabled={!isValidate}>
                Добавить
            </Button>
        </Stack>
    );
};

export default ShipmentsAddNewHeader;