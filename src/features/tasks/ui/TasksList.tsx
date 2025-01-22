import React, {FC} from "react";
import {ITask} from "../../../models/ITasks";
import TasksListItem from "./TasksListItem";
import Box from "@mui/material/Box";
import TaskDetails from "./TaskDetails";

interface IProps {
    tasks: ITask[] | null;
}

const TasksList: FC<IProps> = ({tasks}) => {
    const [selectedTask, setSelectedTask] = React.useState<ITask | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const handleDrawerToggle = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setIsDrawerOpen(isOpen);
    };

    const handleTaskSelect = (task: ITask) => {
        setSelectedTask(task);
        setIsDrawerOpen(true);
    };
    const tasksList = tasks?.map(task => (<TasksListItem key={task.id}
                                                         task={task}
                                                         onDetailsClick={() => handleTaskSelect(task)}/>)) || null;
    return (
        <div>
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(275px, 100%), 1fr))",
                    gap: "16px",
                    paddingTop: "16px",
                }}
            >
            {tasksList}
            </Box>
            {selectedTask && (
                <TaskDetails
                    isOpen={isDrawerOpen}
                    toggleDrawer={handleDrawerToggle}
                    task={selectedTask}
                />
            )}
        </div>
    );
};

export default TasksList;