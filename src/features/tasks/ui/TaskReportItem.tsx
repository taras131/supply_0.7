import React, {FC} from "react";
import {ListItemButton, ListItemIcon, ListItemText, useMediaQuery} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {convertMillisecondsToDate} from "../../../utils/services";
import {useAppSelector} from "../../../hooks/redux";
import {getTaskById} from "../../machinery/model/selectors";
import {getUserFullNameById} from "../../users/model/selectors";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";

interface IProps {
    taskId: number
}

const TaskReportItem: FC<IProps> = ({taskId}) => {
    const navigate = useNavigate();
    const matches_650 = useMediaQuery("(max-width:650px)");
    const task = useAppSelector(state => getTaskById(state, taskId));
    const assignedFullName = useAppSelector(state => getUserFullNameById(state, task?.assigned_to_id || null));
    if (!task) return null;
    const viewTaskClickHandler = () => {
        navigate(`${routes.tasks}/${task.id}`);
    };
    const resultOperating = task.result_operating ? `${task.result_operating} ч.` : `${task.result_odometer} км.`;
    const date = convertMillisecondsToDate(task.created_date);
    return (
        <ListItemButton onClick={viewTaskClickHandler}>
            <ListItemIcon sx={{minWidth: "30px"}}>
                {task.status_id === 1 && <AssignmentIcon color="warning"/>}
                {task.status_id === 2 && <BuildIcon color="primary"/>}
                {task.status_id === 3 && <CheckCircleIcon color="success"/>}
            </ListItemIcon>
            <ListItemText primary={matches_650 ? date.slice(0, 5) : date}
            />
            <ListItemText color="primary"
                          secondary={task.title}/>
            <ListItemText color="primary"
                          primary={task.status_id === 3
                              ? resultOperating
                              : assignedFullName}
            />
        </ListItemButton>
    );
};

export default TaskReportItem;