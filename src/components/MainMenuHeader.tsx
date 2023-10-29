import React from "react";
import {Stack, Typography} from "@mui/material";

const MainMenuHeader = () => {
    return (
        <Stack spacing={1} justifyContent={"start"}  sx={{maxWidth: "1000px", width: "100%", padding: "16px 16px"}}>
            <Typography fontWeight={700} fontSize={40}>
                Иткана
            </Typography>
            <Typography fontWeight={600} fontSize={16} color={"gray"}>
                Эффективное управление, учет и документооборот.
            </Typography>
        </Stack>
    );
};

export default MainMenuHeader;