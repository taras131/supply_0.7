import React, {FC} from "react";
import {Drawer, Box, useMediaQuery} from "@mui/material";
import {DrawerMode} from "../../../hooks/useProblemDrawer";
import ProblemCard from "./ProblemCard";
import ProblemAddNew from "./ProblemAddNew";

interface IProps {
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    mode: DrawerMode;
    currentProblemId?: number;
}

const ProblemDrawer: FC<IProps> = ({
                                       isOpen,
                                       onClose,
                                       mode,
                                       currentProblemId = 0,
                                   }) => {
    const matches_650 = useMediaQuery("(max-width:650px)");

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
            variant="temporary"
            transitionDuration={{enter: 300, exit: 300}}
            sx={{
                flexShrink: 0,
                width: matches_650 ? "400px" : "500px",
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: matches_650 ? "400px" : "500px",
                },
            }}
        >
            <Box
                sx={{
                    padding: matches_650 ? "10px" : "18px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {mode === "create"
                    ? (<ProblemAddNew onClose={onClose}/>)
                    : (<ProblemCard onClose={onClose} currentProblemId={currentProblemId}/>)}
            </Box>
        </Drawer>
    );
};

export default ProblemDrawer;
