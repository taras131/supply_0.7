import React, {ChangeEvent, FC} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {ITask} from "../../../../models/ITasks";


interface IProps {
    editedTask: ITask;
    handleDateChange: (date: Date | null) => void;
    taskFieldChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TaskResultEdit: FC<IProps> = ({editedTask, taskFieldChangeHandler}) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Добавить Результат
            </Typography>
            <TextField id="outlined-basic"
                       label="Результат"
                       variant="outlined"
                       name="result_description"
                       onChange={taskFieldChangeHandler}
                       value={editedTask.result_description}/>
            <TextField id="outlined-basic"
                       label="Потраченные материалы"
                       variant="outlined"
                       name="spent_resources"
                       onChange={taskFieldChangeHandler}
                       value={editedTask.spent_resources}/>
        </>
    );
};

export default TaskResultEdit;