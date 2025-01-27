import React, {FC} from "react";
import {Drawer} from "@mui/material";
import Box from "@mui/material/Box";
import TaskEdit from "./TaskEdit";
import {INewTask, ITask} from "../../../../models/ITasks";
import TaskInfo from "./TaskInfo";
import Button from "@mui/material/Button";

interface IProps {
    isOpen: boolean
    onClose:  (event: React.KeyboardEvent | React.MouseEvent) => void;
    currentTask: ITask | INewTask | null;
    isEdit: boolean;
}

const TaskDetails: FC<IProps> = ({isOpen, onClose, currentTask, isEdit}) => {
    if (!currentTask) return null;
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <Box
                role="presentation"
                sx={{
                    width: "600px",
                    height: "100vh",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {isEdit
                    ? (<TaskEdit task={currentTask} onClose={onClose}/>)
                    : (<TaskInfo task={currentTask}/>)}
                <Button variant="contained"
                        color="secondary"
                        onClick={onClose}
                        sx={{mt: "auto"}}>
                    Закрыть
                </Button>
            </Box>
        </Drawer>
    );
};

export default TaskDetails;