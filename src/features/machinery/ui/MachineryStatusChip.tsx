import React, {FC} from "react";
import {Chip, useMediaQuery} from "@mui/material";
import {MachineryStatus} from "../utils/const";

interface IProps {
    status: MachineryStatus;
}

const MachineryStatusChip: FC<IProps> = ({status}) => {
    const matches_650 = useMediaQuery("(max-width:650px)");
    let color: "success" | "warning" | "error" = "success";
    if (status === MachineryStatus.repair) color = "warning";
    if (status === MachineryStatus.disActive) color = "error";
    return (
        <Chip
            label={matches_650 ? " " : status}
            color={color}
        />
    );
};

export default MachineryStatusChip;