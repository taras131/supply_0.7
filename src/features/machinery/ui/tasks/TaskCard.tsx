import React, {FC} from "react";
import {Card, CardContent, CardActions, Stack, Typography, Button, Chip} from "@mui/material";
import {ITask} from "../../../../models/ITasks";
import dayjs from "dayjs";
import {useDrag} from "react-dnd";
import Box from "@mui/material/Box";
import PrioritiesChip from "../common/PrioritiesChip";
import {routes} from "../../../../utils/routes";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/redux";
import {getUserFullNameById} from "../../../users/model/selectors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {PRIORITIES} from "../../utils/const";

interface IProps {
    task: ITask;
}

const TaskCard: FC<IProps> = ({task}) => {
    const navigate = useNavigate();
    const assignedFullName = useAppSelector(state => getUserFullNameById(state, task.assigned_to_id));
    const [{isDragging}, drag] = useDrag({
        type: "TASK",
        item: {id: task.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const handleNavigateToDetails = () => {
        navigate(routes.machineryTaskDetails.replace(":machineryId", task.machinery_id?.toString() || "").replace(":taskId", task.id.toString()));
    };
    const getTextColor = (): "info" | "error" | "warning" | "primary" => {
        if (!task.due_date) return "info"; // Если даты нет, цвет черный по умолчанию
        const today = dayjs(); // Текущая дата
        const dueDate = dayjs(task.due_date); // Дата исполнения задачи
        const difference = dueDate.diff(today, "day"); // Разница в днях
        if (difference < 0) return "error"; // Просроченная дата
        if (difference === 0) return "warning"; // Сегодняшняя дата
        if (difference === 1) return "primary"; // Завтра
        return "info"; // Остальные дни
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
            <CardContent sx={{p: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Chip label={`до: ${task.due_date ? dayjs(task.due_date).format("DD.MM.YY") : "нет даты"}`}
                          color={getTextColor()}/>
                    {getPriorityIcon(task.priority_id)}
                </Stack>
                <Typography variant="h5" component="div" mt={1}>
                    {task.title}
                </Typography>
                <Box sx={{height: "60px", overflowY: "hidden", marginTop: 1}}>
                    <Typography variant="body2">
                        {task.description}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{p: 2}}>
                <Stack sx={{width: "100%"}} direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle2">{assignedFullName}</Typography>
                    <Button
                        size="small"
                        variant="outlined"
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