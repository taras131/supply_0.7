import React, {FC} from "react";
import {Card, CardContent, CardActions, Stack, Typography, Chip, Button} from "@mui/material";
import {ITask, taskPriority} from "../../../../models/ITasks";
import dayjs from "dayjs";
import {useDrag} from "react-dnd";
import Box from "@mui/material/Box";
import {getPriorityColor} from "../../../../utils/services";

interface IProps {
    task: ITask;
    openDetailsHandler: () => void;
    openEditHandler: () => void;
}

const TaskCard: FC<IProps> = ({task, openDetailsHandler, openEditHandler}) => {
    const chipColor = getPriorityColor(task.priority_id);
    const [{isDragging}, drag] = useDrag({
        type: "TASK",
        item: {id: task.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <Card
            ref={drag}
            style={{
                borderRadius: "4px",
                /* backgroundColor: isDragging ? "#d3d3d3" : "white",*/
                opacity: isDragging ? 0 : 1, // Пропадаем при перетаскивании
                height: isDragging ? 0 : "auto",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
        >
            <CardContent sx={{p: 2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>
                        до: {task.due_date ? dayjs(task.due_date).format("DD.MM.YY") : "нет даты"}
                    </Typography>
                    <Chip color={chipColor} label={taskPriority[task.priority_id].title} size="small"/>
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
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Button size="small" onClick={openDetailsHandler}>Подробнее</Button>
                    <Button size="small" onClick={openEditHandler}>Редактировать</Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default TaskCard;