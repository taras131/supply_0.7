import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "../../../../hooks/redux";
import {getTaskById} from "../../model/selectors";
import {useEditor} from "../../../../hooks/useEditor";
import {defaultTask} from "../../utils/const";
import {ITask} from "../../../../models/ITasks";
import {taskValidate} from "../../../../utils/validators";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskDetails from "./TaskDetails";

const TaskDetailsPage = () => {
    const {taskId} = useParams();
    const navigate = useNavigate();
    const [expandedIssuePanel, setExpandedIssuePanel] = useState(true);
    const [expandedResultPanel, setExpandedResultPanel] = useState(false);
    const currentTask = useAppSelector(state => getTaskById(state, +taskId));
    const {
        editedValue,
        errors,
        handleFieldChange,
        setEditedValue,
    } = useEditor<ITask>({
        initialValue: JSON.parse(JSON.stringify(defaultTask)),
        validate: taskValidate,
    });
    useEffect(() => {
        if (currentTask) {
            setEditedValue(currentTask);
        }
    }, [currentTask]);
    if (!currentTask) return null;
    const handleDateChange = (date: any) => {
        if (date && date.isValid && date.isValid()) {
            setEditedValue(prev => ({
                ...prev,
                due_date: date.toDate().getTime(),
            }));
        }
    };
    return (
        <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button variant="outlined"
                        onClick={() => navigate(-1)}>
                    Назад
                </Button>
                <Typography variant="h2" fontSize={"24px"} textAlign="center">
                    Подробности задачи:
                </Typography>
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