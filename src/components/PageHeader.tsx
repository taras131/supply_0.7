import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface IProps {
    route: string
    title: string
    buttonText: string
    maxWidth?: string
}

const PageHeader: FC<IProps> = ({route, title, buttonText, maxWidth = "1350px"}) => {
    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate(route);
    };
    return (
        <Stack sx={{maxWidth: maxWidth, width: "100%"}}
               direction={"row"}
               alignItems={"center"}
               justifyContent={"space-between"}>
            <Typography variant="h2" fontSize="24px" fontWeight={700}>
                {title}
            </Typography>
            <Button startIcon={<AddIcon/>} variant="contained" size="large" onClick={handleAddClick}>
                {buttonText}
            </Button>
        </Stack>
    );
};

export default PageHeader;