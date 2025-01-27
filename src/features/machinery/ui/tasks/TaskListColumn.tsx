import React from "react";
import {useDrop} from "react-dnd";
import {INewTask, ITask} from "../../../../models/ITasks";
import TaskCard from "./TaskCard";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";


interface TasksColumnProps {
    status: { id: number; title: string };
    tasks: ITask[];
    onViewTask: (task: ITask) => () => void;
    onEditTask: (task: ITask) => () => void;
    handleAddNewTask: () => void;
    moveTask: (taskId: number, newStatusId: number) => void;
}

const TasksColumn: React.FC<TasksColumnProps> = ({
                                                     status,
                                                     tasks,
                                                     onViewTask,
                                                     onEditTask,
                                                     handleAddNewTask,
                                                     moveTask,
                                                 }) => {
    const [, drop] = useDrop({
        accept: "TASK",
        drop: (item: { id: number }) => moveTask(item.id, status.id),
    });
    return (
        <Stack
            ref={drop}
            spacing={1}
            style={{
                backgroundColor: "#f0f0f0",
                padding: "16px",
                borderRadius: "8px",
                flex: "1",
                minHeight: "300px",
                border: "1px solid #ccc",
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <h3>{status.title}</h3>
                {status.id === 0 && (
                    <Button size="small"
                            variant="contained"
                            color="primary"
                            onClick={handleAddNewTask}
                    >
                        Добавить
                    </Button>
                )}
            </Stack>
            {tasks.map((task) => (
                <TaskCard key={task.id}
                          task={task}
                          openDetailsHandler={onViewTask(task)}
                          openEditHandler={onEditTask(task)}/>
            ))}
        </Stack>
    );
};

export default TasksColumn;
