import React, {FC} from "react";
import {Card, CardContent, CardActions, Stack, Typography, Button, Chip} from "@mui/material";
import {ITask} from "../../../models/ITasks";
import dayjs from "dayjs";
import {useDrag} from "react-dnd";
import Box from "@mui/material/Box";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/redux";
import {getUserFullNameById} from "../../users/model/selectors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {PRIORITIES} from "../../machinery/utils/const";
import {getMachineryTitleById} from "../../machinery/model/selectors";
import {getDueDateColor} from "../utils/services";

interface IProps {
    task: ITask;
    machineryMode: boolean;
}

const TaskCard: FC<IProps> = ({task, machineryMode}) => {
    const navigate = useNavigate();
    const assignedFullName = useAppSelector(state => getUserFullNameById(state, task.assigned_to_id));
    const machineryTitle = useAppSelector(state => getMachineryTitleById(state, task.machinery_id));
    const [{isDragging}, drag] = useDrag({
        type: "TASK",
        item: {id: task.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const handleNavigateToDetails = () => {
        navigate(routes.machineryTaskDetails.replace(":taskId", task.id.toString()));
    };

    const getPriorityIcon = (priorityId: number) => {
        const IconComponent = PRIORITIES.find(priority => priority.id === priorityId);
        return IconComponent ? <IconComponent.icon color={IconComponent.color}/> : null;
    };
    return (
        <Card
            ref={drag}
            style={{
                borderRadius: "4px",
                backgroundColor: isDragging ? "#d3d3d3" : "white",
                height: isDragging ? 0 : "auto",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
        >
            <CardContent sx={{p: 0}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Chip label={`до: ${task.due_date ? dayjs(task.due_date).format("DD.MM.YY") : "нет даты"}`}
                          color={getDueDateColor(task.due_date)}/>
                    {machineryMode
                        ? (getPriorityIcon(task.priority_id))
                        : (<Typography variant="subtitle2" fontSize={16}>
                            {machineryTitle}
                        </Typography>)}
                </Stack>
                <Typography variant="h5" component="div" mt={1} fontSize={16}>
                    {task.title}
                </Typography>
                <Box sx={{height: "60px", overflowY: "hidden", marginTop: 1}}>
                    <Typography variant="body2" fontSize={12}>
                        {task.description}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{p: 0}}>
                <Stack sx={{width: "100%"}} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle2">{assignedFullName}</Typography>
                    <Button
                        size="small"
                        variant="text"
                        onClick={handleNavigateToDetails}
                        endIcon={<MoreHorizIcon/>}>
                        Подробнее
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default TaskCard;