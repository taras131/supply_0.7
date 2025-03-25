import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEditor} from "../../../hooks/useEditor";
import {ITask} from "../../../models/ITasks";
import {taskValidate} from "../../../utils/validators";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskDetails from "./TaskDetails";
import {getCurrentTask, getTaskIsLoading} from "../model/selectors";
import {fetchGetTaskById, fetchUpdateTask} from "../model/actions";
import {defaultTask} from "../utils/consts";
import Preloader from "../../../components/Preloader";

const TaskDetailsPage = () => {
    const dispatch = useAppDispatch();
    const {taskId} = useParams();
    const navigate = useNavigate();
    const [expandedIssuePanel, setExpandedIssuePanel] = useState(true);
    const [expandedResultPanel, setExpandedResultPanel] = useState(false);
    const currentTask = useAppSelector(getCurrentTask);
    const isLoading = useAppSelector(getTaskIsLoading);
    const {
        editedValue,
        errors,
        handleFieldChange,
        setEditedValue,
        validateValue,
    } = useEditor<ITask>({
        initialValue: JSON.parse(JSON.stringify(defaultTask)),
        validate: taskValidate,
    });
    useEffect(() => {
        if (taskId) {
            dispatch(fetchGetTaskById(+taskId));
        }
    }, []);
    useEffect(() => {
        if (currentTask) {
            setEditedValue(currentTask);
            setExpandedResultPanel(currentTask.status_id === 3);
        }
        validateValue();
    }, [currentTask]);
    if (isLoading) return (<Preloader/>);
    if (!currentTask) return null;
    const handleDateChange = (date: any) => {
        if (date && date.isValid && date.isValid()) {
            setEditedValue(prev => ({
                ...prev,
                due_date: date.toDate().getTime(),
            }));
        }
    };
    const handleStatusChange = (statusId: number) => {
        if (editedValue.status_id !== statusId) {
            dispatch(fetchUpdateTask({...editedValue, status_id: statusId}));
        }
    };
    return (
        <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button variant="outlined"
                        onClick={() => navigate(-1)}>
                    Назад
                </Button>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button color={editedValue.status_id === 1 ? "warning" : "primary"}
                            variant={editedValue.status_id === 1 ? "contained" : "outlined"}
                            onClick={() => handleStatusChange(1)}>
                        Новая
                    </Button>
                    <Button
                        variant={editedValue.status_id === 2 ? "contained" : "outlined"}
                        onClick={() => handleStatusChange(2)}>
                        В работе
                    </Button>
                    <Button color={editedValue.status_id === 3 ? "success" : "primary"}
                            variant={editedValue.status_id === 3 ? "contained" : "outlined"}
                            onClick={() => handleStatusChange(3)}>
                        Завершена
                    </Button>
                </ButtonGroup>
            </Stack>
            <Accordion expanded={expandedIssuePanel} onChange={() => setExpandedIssuePanel(prev => !prev)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Постановка задачи</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TaskDetails
                        editedValue={editedValue}
                        fieldChangeHandler={handleFieldChange}
                        handleDateChange={handleDateChange}
                        errors={errors}
                        viewType="issue"
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expandedResultPanel} onChange={() => setExpandedResultPanel(prev => !prev)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Результат выполнения</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TaskDetails
                        editedValue={editedValue}
                        fieldChangeHandler={handleFieldChange}
                        handleDateChange={handleDateChange}
                        errors={errors}
                        viewType="result"
                    />
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
};

export default TaskDetailsPage;