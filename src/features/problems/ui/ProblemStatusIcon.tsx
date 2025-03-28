import React, {FC} from "react";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface IProps {
    statusId: number
}

const ProblemStatusIcon:FC<IProps> = ({statusId}) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            {statusId === 1 && <AssignmentIcon color="warning"/>}
            {statusId === 2 && <BuildIcon color="primary"/>}
            {statusId === 3 && <CheckCircleIcon color="success"/>}
        </Box>
    );
};

export default ProblemStatusIcon;