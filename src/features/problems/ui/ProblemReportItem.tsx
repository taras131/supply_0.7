import React, {FC} from "react";
import {IProblem} from "../../../models/IProblems";
import {ListItemButton, ListItemText, useMediaQuery} from "@mui/material";
import {convertMillisecondsToDate} from "../../../utils/services";
import ProblemPriorityChip from "./ProblemPriorityChip";
import ProblemStatusIcon from "./ProblemStatusIcon";

interface IProps {
    problem: IProblem
    handleProblemClick: () => void;
}

const ProblemReportItem: FC<IProps> = ({problem, handleProblemClick}) => {
    const matches_650 = useMediaQuery("(max-width:650px)");
    const date = convertMillisecondsToDate(problem.created_date);
    return (
        <ListItemButton onClick={handleProblemClick}>
            <ProblemStatusIcon statusId={problem.status_id}/>
            <ListItemText color="primary"
                          primary={matches_650 ? date.slice(0, 5) : date}
                          sx={{marginLeft: "5px"}}
            />
            <ListItemText color="primary"
                          secondary={problem.title}/>
            <ProblemPriorityChip priorityId={problem.priority_id}/>
        </ListItemButton>
    );
};

export default ProblemReportItem;