import React, {FC, useState} from "react";
import {IProblem} from "../../../../models/IProblems";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProblemsTable from "./ProblemsTable";
import ProblemDrawer, {DrawerMode} from "./ProblemDrawer";

interface IProps {
    problems: IProblem[];
}

interface IDrawerState {
    isOpen: boolean;
    mode: DrawerMode;
    problem: IProblem | null
}

const Problems: FC<IProps> = ({problems}) => {
    const [drawerState, setDrawerState] = useState<IDrawerState>({
        isOpen: false,
        mode: "create",
        problem: null,
    });

    const handleDrawerClose = () => {
        setDrawerState(prev => ({ ...prev, isOpen: false , problem: null }));
    };

    const handleAddClick = () => {
        setDrawerState({
            isOpen: true,
            mode: "create",
            problem: null,
        });
    };

    const handleProblemClick = (problem: IProblem) => {
        setDrawerState({
            isOpen: true,
            mode: "view",
            problem,
        });
    };

    return (
        <Stack spacing={4}>
            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Замечания</Typography>
                <Button
                    onClick={handleAddClick}
                    startIcon={<AddIcon />}
                    variant="contained"
                >
                    Добавить
                </Button>
            </Stack>

            <ProblemsTable
                rows={problems}
                onProblemClick={handleProblemClick}
            />

            <ProblemDrawer
                isOpen={drawerState.isOpen}
                onClose={handleDrawerClose}
                mode={drawerState.mode}
                problem={drawerState.problem}
            />
        </Stack>
    );
};

export default Problems;