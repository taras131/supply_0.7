import React, {FC} from "react";
import {IProblem} from "../../../models/IProblems";
import {Chip, ListItemButton, ListItemIcon, ListItemText, useMediaQuery} from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {convertMillisecondsToDate} from "../../../utils/services";
import {getPriorityChipColor, getPriorityTitleById} from "../../machinery/utils/services";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface IProps {
    problem: IProblem
    handleProblemClick: () => void;
}

const ProblemReportItem: FC<IProps> = ({problem, handleProblemClick}) => {
    const matches_850 = useMediaQuery("(max-width:850px)");
    const priorityColor = getPriorityChipColor(problem.priority_id);
    const label = getPriorityTitleById(problem.priority_id) || " ";
    return (
        <ListItemButton onClick={handleProblemClick}>
            <ListItemIcon>
                {problem.status_id === 1 && <HourglassBottomIcon color="error"/>}
                {problem.status_id === 2 && <AssignmentIcon color="warning"/>}
                {problem.status_id === 3 && <BuildIcon color="primary"/>}
                {problem.status_id === 4 && <CheckCircleIcon color="success"/>}
            </ListItemIcon>
            <ListItemText color="primary"
                          primary={convertMillisecondsToDate(problem.created_date)}
            />
            <ListItemText color="primary"
                          secondary={problem.title}/>
            <Chip
                label={matches_850 ? label[0] : label}
                color={priorityColor}
            />
        </ListItemButton>
    );
};

export default ProblemReportItem;