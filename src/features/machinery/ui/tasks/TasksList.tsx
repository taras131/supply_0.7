import React, {FC} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import TasksColumn from "./TaskListColumn";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {fetchUpdateMachineryTask} from "../../model/actions";
import {getCurrentMachineryTasks} from "../../model/selectors";
import {taskStatus} from "../../utils/const";

export const TaskList: FC = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(getCurrentMachineryTasks);
    const moveTask = (taskId: number, newStatusId: number) => {
        if (tasks.length) {
            const updatedTasks = {...tasks.filter(task => task.id === taskId)[0]};
            dispatch(fetchUpdateMachineryTask({...updatedTasks, status_id: newStatusId}));
        }
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
                    />
                ))}
            </div>
        </DndProvider>
    );
};



