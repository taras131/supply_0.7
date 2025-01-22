import React, {useState} from "react";
import Button from "@mui/material/Button";
import TasksAddNew from "../../tasks/ui/TasksAddNew";
import {useAppSelector} from "../../../hooks/redux";
import {getCurrentMachineryId, getCurrentMachineryTasks} from "../model/selectors";
import TasksList from "../../tasks/ui/TasksList";

const MachineryDetailsTasks = () => {
    const [isOpen, setIsOpen] = useState(false);
    const machineryId = useAppSelector(getCurrentMachineryId);
    const tasks = useAppSelector(getCurrentMachineryTasks);
    const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }
        setIsOpen(isOpen);
    };
    return (
        <div>
            <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
                Добавить
            </Button>
            <TasksAddNew isOpen={isOpen} toggleDrawer={toggleDrawer} machineryId={machineryId}/>
            <TasksList tasks={tasks} />
        </div>
    );
};

export default MachineryDetailsTasks;