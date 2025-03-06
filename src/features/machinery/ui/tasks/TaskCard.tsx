import React, {FC} from "react";
import {Card, CardContent, CardActions, Stack, Typography, Button} from "@mui/material";
import {ITask} from "../../../../models/ITasks";
import dayjs from "dayjs";
import {useDrag} from "react-dnd";
import Box from "@mui/material/Box";
import PrioritiesChip from "../common/PrioritiesChip";
import {routes} from "../../../../utils/routes";
import {useNavigate} from "react-router-dom";

interface IProps {
    task: ITask;
}

const TaskCard: FC<IProps> = ({task}) => {
    const navigate = useNavigate();
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
                    <Typography>
                        до: {task.due_date ? dayjs(task.due_date).format("DD.MM.YY") : "нет даты"}
                    </Typography>
                    <PrioritiesChip priorityId={task.priority_id}/>
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
                    <Button size="small" onClick={handleNavigateToDetails}>Подробнее</Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default TaskCard;