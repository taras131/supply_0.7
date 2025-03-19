import React, {FC} from "react";
import {IProblem} from "../../../models/IProblems";
import {Chip, ListItemButton, ListItemIcon, ListItemText, useMediaQuery} from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {convertMillisecondsToDate} from "../../../utils/services";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ProblemPriorityChip from "./ProblemPriorityChip";

interface IProps {
    problem: IProblem
    handleProblemClick: () => void;
}

const ProblemReportItem: FC<IProps> = ({problem, handleProblemClick}) => {
    const matches_650 = useMediaQuery("(max-width:650px)");
    const date = convertMillisecondsToDate(problem.created_date);
    return (
        <ListItemButton onClick={handleProblemClick}>
            <ListItemIcon sx={{ minWidth: "30px" }}>
                {problem.status_id === 1 && <HourglassBottomIcon color="error"/>}
                {problem.status_id === 2 && <AssignmentIcon color="warning"/>}
                {problem.status_id === 3 && <BuildIcon color="primary"/>}
                {problem.status_id === 4 && <CheckCircleIcon color="success"/>}
            </ListItemIcon>
            <ListItemText color="primary"
                          primary={matches_650 ? date.slice(0,5) : date}
            />
            <ListItemText color="primary"
                          secondary={problem.title}/>
            <ProblemPriorityChip priorityId={problem.priority_id}/>
        </ListItemButton>
    );
};

export default ProblemReportItem;