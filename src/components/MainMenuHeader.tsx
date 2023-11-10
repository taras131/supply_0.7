import React, {useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";

const subTitle = "Эффективное управление, учет и документооборот.";

const MainMenuHeader = () => {
    const [showSubtitle, setShowSubtitle] = useState("");
    const updateSubtitle = (char: string) => {
        setShowSubtitle(prev => prev + char);
    };
    useEffect(() => {
        let i = 0;
        const timeout = setTimeout(function run() {
            updateSubtitle(subTitle[i]);
            i++;
            if(i < subTitle.length) {
                setTimeout(run, 100);
            }
        }, 100);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <Stack spacing={1} justifyContent={"start"} sx={{maxWidth: "1000px", width: "100%", padding: "16px 16px"}}>
            <Typography fontWeight={700} fontSize={40}>
                Иткана
            </Typography>
            <Typography fontWeight={600} fontSize={16} color={"gray"}>
                {showSubtitle}
            </Typography>
        </Stack>
    );
};

export default MainMenuHeader;