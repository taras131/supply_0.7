import React, {ChangeEvent, FC} from "react";
import Card from "@mui/material/Card";
import {SelectChangeEvent, Stack, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SearchTextField from "../../../components/common/SearchTextField";
import FilterSelect from "../../../components/common/FilterSelect";
import {useAppSelector} from "../../../hooks/redux";
import {getMachineryForSelect} from "../../machinery/model/selectors";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import {taskStatus, taskTypes} from "../utils/consts";

interface IProps {
    tasksFilter: {
        machinery_id: number,
        type_id: number,
        text: string,
        status_id: number,
    };
    filterChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => void;
}

const TasksPageHeader: FC<IProps> = ({tasksFilter, filterChangeHandler}) => {
    const navigate = useNavigate();
    const matches_1100 = useMediaQuery("(max-width:1100px)");
    const matches_850 = useMediaQuery("(max-width:850px)");
    const actualMachinery = useAppSelector(getMachineryForSelect);
    const createTaskClickHandler = () => {
        navigate(routes.machineryAddTask);
    };
    return (
        <Card>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Typography fontSize={matches_850 ? "1.5rem" : "2rem"} variant="h4">Задачи</Typography>
                <Button
                    onClick={createTaskClickHandler}
                    startIcon={<AddIcon/>}
                    variant="contained"
                >
                    Добавить
                </Button>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" mt={2} sx={{flexWrap: "wrap"}}>
                <SearchTextField value={tasksFilter.text}
                                 label="Поиск по ключевым словам"
                                 name="text"
                                 onChange={filterChangeHandler}/>
                <FilterSelect label="Техника"
                              name="machinery_id"
                              value={tasksFilter.machinery_id}
                              onChange={filterChangeHandler}
                              options={actualMachinery}/>
                <FilterSelect label="Категория"
                              name="type_id"
                              value={tasksFilter.type_id}
                              onChange={filterChangeHandler}
                              options={taskTypes}/>
                {matches_1100 && (
                    <FilterSelect label="Статус"
                                  name="status_id"
                                  value={tasksFilter.status_id}
                                  onChange={filterChangeHandler}
                                  options={taskStatus}/>
                )}
            </Stack>
        </Card>
    );
};

export default TasksPageHeader;