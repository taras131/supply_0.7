import React, {FC, useState} from "react";
import {IProblem} from "../../../../models/IProblems";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProblemsTable from "./ProblemsTable";
import ProblemAddNew from "./ProblemAddNew";
import ProblemCard from "./ProblemCard";

export type DrawerMode = "create" | "edit" | "view";

interface IProps {
    problems: IProblem[] | null;
}

interface IDrawerState {
    isOpen: boolean;
    mode: DrawerMode;
    problemId: number | null;
}

const Problems: FC<IProps> = ({problems}) => {
    const [drawerState, setDrawerState] = useState<IDrawerState>({
        isOpen: false,
        mode: "create",
        problemId: null,
    });

    const handleDrawerClose = () => {
        setDrawerState(prev => ({...prev, isOpen: false}));
    };

    const handleAddClick = () => {
        setDrawerState({
            isOpen: true,
            mode: "create",
            problemId: null,
        });
    };

    const handleProblemClick = (problemId: number) => {
        setDrawerState({
            isOpen: true,
            mode: "view",
            problemId: problemId,
        });
    };

    return (
        <Stack spacing={4}>
            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Замечания</Typography>
                <Button
                    onClick={handleAddClick}
                    startIcon={<AddIcon/>}
                    variant="contained"
                >
                    Добавить
                </Button>
            </Stack>
            <ProblemsTable
                rows={problems}
                onProblemClick={handleProblemClick}
                activeRowId = {drawerState.problemId}
            />
            {drawerState.isOpen && drawerState.mode === "create" && (
                <ProblemAddNew
                    isOpen={drawerState.isOpen}
                    onClose={handleDrawerClose}
                />
            )}
            {drawerState.isOpen && drawerState.problemId && drawerState.mode === "view" && (
                <ProblemCard
                    isOpen={drawerState.isOpen}
                    onClose={handleDrawerClose}
                    currentProblemId={drawerState.problemId}
                />
            )}
        </Stack>
    );
};

export default Problems;