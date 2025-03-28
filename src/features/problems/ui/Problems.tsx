import React, {FC} from "react";
import {IProblem} from "../../../models/IProblems";
import {Stack, useMediaQuery} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProblemsTable from "./ProblemsTable";
import {useProblemDrawer} from "../../../hooks/useProblemDrawer";
import ProblemDrawer from "./ProblemDrawer";

interface IProps {
    problems: IProblem[] | null;
    isMachineryMode?: boolean;
}

const Problems: FC<IProps> = ({problems, isMachineryMode = true}) => {
    const {drawerState, openDrawer, closeDrawer} = useProblemDrawer();
    const matches_850 = useMediaQuery("(max-width:850px)");
    const handleAddClick = () => {
        openDrawer("create");
    };
    const handleProblemClick = (problemId: number) => {
        openDrawer("view", problemId);
    };
    return (
        <Stack spacing={4}>
            <ProblemsTable
                rows={problems}
                onProblemClick={handleProblemClick}
                activeRowId={drawerState.problemId}
                isMachineryMode={isMachineryMode}
            />
            <ProblemDrawer
                isOpen={drawerState.isOpen}
                onClose={closeDrawer}
                mode={drawerState.mode}
                currentProblemId={drawerState.problemId || 0}
            />
            {isMachineryMode && (
                <>
                    <Button
                        onClick={handleAddClick}
                        startIcon={<AddIcon/>}
                        variant="contained"
                        sx={{
                            position: "fixed",
                            bottom: matches_850 ? "20px" : "40px",
                            right: matches_850 ? "20px" : "40px",
                            zIndex: 1000,
                        }}
                    >
                        Добавить
                    </Button>
                </>
            )}
        </Stack>);
};

export default Problems;