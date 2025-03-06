import React, {FC} from "react";
import {IProblem} from "../../../../models/IProblems";
import Box from "@mui/material/Box";
import {Chip, Typography} from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {convertMillisecondsToDate} from "../../../../utils/services";
import {getPriorityChipColor, getPriorityTitleById} from "../../utils/services";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface IProps {
    problem: IProblem
}

const ProblemReportItem: FC<IProps> = ({problem}) => {
    const priorityColor = getPriorityChipColor(problem.priority_id);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "8px",
            gap: "8px",
            borderBottom: "1px solid lightGray",
        }}>
            {problem.status_id === 1 && <HourglassBottomIcon color="error"/>}
            {problem.status_id === 2 && <AssignmentIcon color="warning"/>}
            {problem.status_id === 3 && <BuildIcon color="primary"/>}
            {problem.status_id === 4 && <CheckCircleIcon color="success"/>}
            <Typography variant="subtitle2">{convertMillisecondsToDate(problem.created_date)}</Typography>
            <Typography sx={{flexGrow: 1}}>{problem.title}</Typography>
            <Chip
                label={getPriorityTitleById(problem.priority_id)}
                color={priorityColor}
                sx={{width: "100px"}}
            />
        </Box>
    );
};

export default ProblemReportItem;