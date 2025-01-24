import React, {FC} from "react";
import {ITask, taskPriority} from "../../../models/ITasks";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {CardActions, Chip, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../../hooks/redux";
import {getUserById} from "../../users/model/selectors";
import dayjs from "dayjs";

interface IProps {
    task: ITask;
    onDetailsClick: () => void;
}

const TasksListItem: FC<IProps> = ({task, onDetailsClick}) => {
    const user = useAppSelector(state => getUserById(state, task.assigned_to_id));
    let chipColor = "success";
    switch (taskPriority[task.priority_id].id) {
        case 1:
            chipColor = "primary";
            break;
        case 2:
            chipColor = "secondary";
            break;
        case 3:
            chipColor = "warning";
            break;
    }
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>
                        до: {task.due_date ? dayjs(task.due_date).format("DD.MM.YY") : "нет даты"}
                    </Typography>
                    <Chip color={chipColor} label={taskPriority[task.priority_id].title} size="small" />
                </Stack>



                <Typography variant="h5" component="div" mt={3}>
                    {task.title}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {user && `${user.first_name} ${user.middle_name}`}
                </Typography>
                <Typography variant="body2">
                    {task.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onDetailsClick}>Подробнее</Button>
                <Button size="small">Добавить результат</Button>
            </CardActions>
        </Card>
    );
};

export default TasksListItem;