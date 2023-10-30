import React, {FC} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface IProps {
    backRoute: string
    title: string
    isValidate: boolean
    handleAddClick: () => void
}

const PageHeaderWithBackButton: FC<IProps> = ({backRoute, title, isValidate, handleAddClick}) => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(backRoute);
    };
    return (
        <Stack sx={{maxWidth: 1000, width: "100%"}}
               direction={"row"}
               alignItems={"center"}
               justifyContent={"space-between"}>
            <Button variant="outlined" size="large" onClick={handleBackClick}>
                Назад
            </Button>
            <Typography variant="h2" fontSize="24px" fontWeight={700}>
                {title}
            </Typography>
            <Button variant="contained" size="large" onClick={handleAddClick} disabled={!isValidate}>
                Добавить
            </Button>
        </Stack>
    );
};

export default PageHeaderWithBackButton;