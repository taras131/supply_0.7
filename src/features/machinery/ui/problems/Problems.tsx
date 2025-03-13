import React, {FC} from "react";
import {IProblem} from "../../../../models/IProblems";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProblemsTable from "./ProblemsTable";
import ProblemAddNew from "./ProblemAddNew";
import ProblemCard from "./ProblemCard";
import {useProblemDrawer} from "../../../../hooks/useProblemDrawer";

interface IProps {
    problems: IProblem[] | null;
}

const Problems: FC<IProps> = ({problems}) => {
    const { drawerState, openDrawer, closeDrawer } = useProblemDrawer();
    const handleAddClick = () => {
        openDrawer("create");
    };
    const handleProblemClick = (problemId: number) => {
        openDrawer("view", problemId);
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
                    onClose={closeDrawer}
                />
            )}
            {drawerState.isOpen && drawerState.problemId && drawerState.mode === "view" && (
                <ProblemCard
                    isOpen={drawerState.isOpen}
                    onClose={closeDrawer}
                    currentProblemId={drawerState.problemId}
                />
            )}
        </Stack>
    );
};

export default Problems;