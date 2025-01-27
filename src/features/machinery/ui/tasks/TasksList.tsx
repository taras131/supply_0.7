import React, {FC, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import TasksColumn from "./TaskListColumn";
import {INewTask, ITask, taskStatus} from "../../../../models/ITasks";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {fetchUpdateMachineryTask} from "../../model/actions";
import {getCurrentMachineryTasks} from "../../model/selectors";
import TaskDetails from "./TaskDetails";
import dayjs from "dayjs";

const newTask: INewTask = {
    title: "",
    description: "",
    status_id: 0,
    priority_id: 0,
    due_date: dayjs().valueOf(),
    author_id: 1,
    assigned_to_id: 2,
    issue_photos: [],
};

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
    const handleDrawerToggle = (isOpen: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            setIsOpen(isOpen);
            if (!isOpen) {
                setIsEdit(false);
                setCurrentTask(null);
            }
        };
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
    const handleAddNewTask = () => {
        setCurrentTask(newTask);
        setIsEdit(true);
        setIsOpen(true);
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{display: "flex", gap: "16px", padding: "16px"}}>
                {taskStatus.map((status) => (
                    <TasksColumn
                        key={status.id}
                        status={status}
                        tasks={tasks.filter((task) => task.status_id === status.id)}
                        moveTask={moveTask}
                        onViewTask={handleViewTask}
                        onEditTask={handleEditTask}
                        handleAddNewTask={handleAddNewTask}
                    />
                ))}
            </div>
            <TaskDetails isOpen={isOpen}
                         isEdit={isEdit}
                         onClose={handleDrawerToggle(false)}
                         currentTask={currentTask}/>
        </DndProvider>
    );
};



