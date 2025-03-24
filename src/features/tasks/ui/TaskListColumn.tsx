import React from "react";
import {useDrop} from "react-dnd";
import {ITask} from "../../../models/ITasks";
import TaskCard from "./TaskCard";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {routes} from "../../../utils/routes";

interface TasksColumnProps {
    status: { id: number; title: string };
    machineryId: number | null;
    tasks: ITask[];
    moveTask: (taskId: number, newStatusId: number) => void;
    machineryMode: boolean;
}

const TasksColumn: React.FC<TasksColumnProps> = ({
                                                     status,
                                                     tasks,
                                                     machineryId,
                                                     moveTask,
                                                     machineryMode,
                                                 }) => {
    const navigate = useNavigate();
    const [, drop] = useDrop({
        accept: "TASK",
        drop: (item: { id: number }) => moveTask(item.id, status.id),
    });
    const createTaskClickHandler = () => {
        navigate(routes.machineryAddTask, {
            state: {machineryId: machineryId},
        });
    };
    return (
        <Stack
            ref={drop}
            spacing={1}
            style={{
                backgroundColor: "#f0f0f0",
                padding: "16px",
                borderRadius: "8px",
                flex: "1",
                minHeight: "70vh",
                border: "1px solid #ccc",
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <h3>{status.title}</h3>
                {status.id === 1 && (
                    <Button
                        onClick={createTaskClickHandler}
                        startIcon={<AddIcon sx={{fontSize: "var(--icon-fontSize-md)"}}/>}
                        variant="contained"
                        size="small"
                    >
                        Добавить
                    </Button>
                )}
            </Stack>
            {tasks.map((task) => (<TaskCard key={task.id} task={task} machineryMode={machineryMode}/>))}
        </Stack>
    );
};

export default TasksColumn;
