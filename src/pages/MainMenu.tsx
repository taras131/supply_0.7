import React from "react";
import {Stack} from "@mui/material";
import MainMenuHeader from "../components/MainMenuHeader";
import MainMenuList from "../components/MainMenuList";

const MainMenu = () => {
    return (
        <Stack alignItems="center" spacing={1} sx={{color: "black"}}>
            <MainMenuHeader/>
            <MainMenuList/>
        </Stack>
    );
};

export default MainMenu;