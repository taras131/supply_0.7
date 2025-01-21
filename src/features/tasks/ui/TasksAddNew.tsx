import React, {ChangeEvent, FC} from 'react';
import {Drawer, SelectChangeEvent} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TasksEdit from "./TasksEdit";

interface IProps {
    isOpen: boolean
    toggleDrawer: (isOpen: boolean) => (event: React. KeyboardEvent | React. MouseEvent) => void
}

const TasksAddNew: FC<IProps> = ({isOpen, toggleDrawer}) => {
    const [editedTask, setEditedTask] = React.useState({
        title: "",
        description: "",
        status_id: 0,
        priority_id: 0,
        due_date: 0,
        items: [],
        author_id: 0,
        assigned_to: 0,
    });
    const taskFieldChangeHandler = (e: ChangeEvent<HTMLInputElement
            | HTMLTextAreaElement>
        | SelectChangeEvent) => {
        setEditedTask(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleDrawer(false)}
        >
            <Box
                role="presentation"
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    height: "100vh",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Добавить задачу
                </Typography>
                <Typography variant="body1">
                    Сюда можно добавить элементы для создания задачи.
                </Typography>
                <TasksEdit editedTask={editedTask} taskFieldChangeHandler={taskFieldChangeHandler} />
                <Button variant="contained" color="secondary" onClick={toggleDrawer(false)} sx={{mt: "auto"}}>
                    Отменить
                </Button>
            </Box>
        </Drawer>
    );
};

export default TasksAddNew;