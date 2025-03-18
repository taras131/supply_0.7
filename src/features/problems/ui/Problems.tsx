import React, {FC} from "react";
import {IProblem} from "../../../models/IProblems";
import {Stack, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProblemsTable from "./ProblemsTable";
import ProblemAddNew from "./ProblemAddNew";
import ProblemCard from "./ProblemCard";
import {useProblemDrawer} from "../../../hooks/useProblemDrawer";

interface IProps {
    problems: IProblem[] | null;
    isMachineryMode?: boolean;
}

const Problems: FC<IProps> = ({problems, isMachineryMode = true}) => {
    const matches_850 = useMediaQuery("(max-width:850px)");
    const {drawerState, openDrawer, closeDrawer} = useProblemDrawer();
    const handleAddClick = () => {
        openDrawer("create");
    };
    const handleProblemClick = (problemId: number) => {
        openDrawer("view", problemId);
    };
    return (
        <Stack spacing={4}>
            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                <Typography variant="h5">Проблемы</Typography>
                <Button
                    onClick={handleAddClick}
                    startIcon={<AddIcon/>}
                    variant="contained"
                    size={matches_850 ? "small" : "medium"}
                >
                    Добавить
                </Button>
            </Stack>
            <ProblemsTable
                rows={problems}
                onProblemClick={handleProblemClick}
                activeRowId={drawerState.problemId}
                isMachineryMode={isMachineryMode}
            />
            {drawerState.isOpen && drawerState.mode === "create" && (
                <ProblemAddNew
                    isOpen={drawerState.isOpen}
                    onClose={closeDrawer}
                />
            )}
            <ProblemCard
                isOpen={drawerState.isOpen}
                onClose={closeDrawer}
                currentProblemId={drawerState.problemId || 0}
            />
        </Stack>
    );
};

export default Problems;