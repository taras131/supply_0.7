import React, {FC} from "react";
import {Chip, useMediaQuery} from "@mui/material";
import {getPriorityChipColor, getPriorityTitleById} from "../utils/services";

interface IProps {
    priorityId: number;
    isNotSmall?: boolean
}

const ProblemPriorityChip: FC<IProps> = ({priorityId, isNotSmall = false}) => {
    const matches_650 = useMediaQuery("(max-width:650px)");
    const priorityColor = getPriorityChipColor(priorityId);
    const label = getPriorityTitleById(priorityId) || " ";
    return (
        <Chip
            label={matches_650 && !isNotSmall ? label[0].toLowerCase() : label}
            color={priorityColor}
            sx={{minWidth: matches_650 && !isNotSmall ? "10px" : "90px"}}
        />
    );
};

export default ProblemPriorityChip;