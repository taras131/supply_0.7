import React, {FC} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import TasksColumn from "./TaskListColumn";
import {useAppDispatch} from "../../../hooks/redux";
import {fetchUpdateTask} from "../model/actions";
import {ITask} from "../../../models/ITasks";
import {taskStatus} from "../utils/consts";

interface IProps {
    tasks: ITask[] | null;
    machineryId?: number;
    machineryMode?: boolean;
}

export const TaskList: FC<IProps> = ({tasks, machineryId = null, machineryMode = false}) => {
    const dispatch = useAppDispatch();
    if(!tasks) return null;
    const moveTask = (taskId: number, newStatusId: number) => {
        if (tasks.length) {
            const updatedTasks = {...tasks.filter(task => task.id === taskId)[0]};
            dispatch(fetchUpdateTask({...updatedTasks, status_id: newStatusId}));
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
                {taskStatus.map(status => (
                    <TasksColumn
                        key={status.id}
                        machineryId={machineryId}
                        status={status}
                        tasks={tasks.filter((task) => task.status_id === status.id)}
                        moveTask={moveTask}
                        machineryMode={machineryMode}
                    />
                ))}
            </div>
        </DndProvider>
    );
};



