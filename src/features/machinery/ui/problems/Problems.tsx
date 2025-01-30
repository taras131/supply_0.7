import React, {FC, useCallback, useState} from "react";
import {IProblem} from "../../../../models/IProblems";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import AddNew from "./AddNew";
import ProblemsList from "./ProblemsList";

interface IProps {
    problems: IProblem[];
}

const Problems: FC<IProps> = ({problems}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }
        setIsOpen(isOpen);
    };
    return (
        <Stack spacing={4}>
            <Stack  direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Замечания</Typography>
                <div>
                    <Button
                        onClick={toggleDrawer(true)}
                        startIcon={<AddIcon sx={{fontSize: "var(--icon-fontSize-md)"}}/>}
                        variant="contained">
                        Добавить
                    </Button>
                </div>
            </Stack>
            <ProblemsList problems={problems}/>
            <AddNew isOpen={isOpen} onClose={toggleDrawer(false)}/>
        </Stack>
    );
};

export default Problems;