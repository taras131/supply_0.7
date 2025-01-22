import React, {FC} from "react";
import {ITask, taskPriority} from "../../../models/ITasks";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {CardActions} from "@mui/material";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../../hooks/redux";
import {getUserById} from "../../users/model/selectors";

interface IProps {
    task: ITask;
    onDetailsClick: () => void;
}

const TasksListItem: FC<IProps> = ({task, onDetailsClick}) => {
    const user = useAppSelector(state => getUserById(state, task.assigned_to_id));
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {taskPriority[task.priority_id].title}
                </Typography>
                <Typography variant="h5" component="div">
                    {task.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
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