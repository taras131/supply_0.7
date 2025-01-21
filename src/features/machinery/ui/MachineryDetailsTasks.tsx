import React, {useState} from "react";
import Button from "@mui/material/Button";
import TasksAddNew from "../../tasks/ui/TasksAddNew";

const MachineryDetailsTasks = () => {
    const [isOpen, setIsOpen] = useState(false);
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
            <TasksAddNew isOpen={isOpen} toggleDrawer={toggleDrawer}/>
        </div>
    );
};

export default MachineryDetailsTasks;