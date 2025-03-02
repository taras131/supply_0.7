import React, {FC, useCallback, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import TasksColumn from "./TaskListColumn";
import {INewTask, ITask} from "../../../../models/ITasks";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {fetchUpdateMachineryTask} from "../../model/actions";
import {getCurrentMachineryTasks} from "../../model/selectors";
import TaskDetails from "./TaskDetails";
import {taskStatus} from "../../utils/const";

export const TaskList: FC = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentTask, setCurrentTask] = useState<ITask | INewTask | null>(null);
    const tasks = useAppSelector(getCurrentMachineryTasks);
    const moveTask = (taskId: number, newStatusId: number) => {
        if (tasks.length) {
            const updatedTasks = {...tasks.filter(task => task.id === taskId)[0]};
            dispatch(fetchUpdateMachineryTask({...updatedTasks, status_id: newStatusId}));
        }
    };
    const handleDrawerToggle = useCallback((event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setIsOpen(false);
        setIsEdit(false);
    }, []);
    const handleViewTask = (task: ITask) => () => {
        setCurrentTask(task);
        setIsEdit(false);
        setIsOpen(true);
    };
    const handleEditTask = (task: ITask) => () => {
        setCurrentTask(task);
        setIsEdit(true);
        setIsOpen(true);
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{
                display: "flex",
                minHeight: "690px",
                gap: "16px",
                padding: "16px",
            }}>
                {taskStatus.map((status) => (
                    <TasksColumn
                        key={status.id}
                        status={status}
                        tasks={tasks.filter((task) => task.status_id === status.id)}
                        moveTask={moveTask}
                        onViewTask={handleViewTask}
                        onEditTask={handleEditTask}
                    />
                ))}
            </div>
        </DndProvider>
    );
};



