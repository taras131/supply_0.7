import React, {useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import TaskIssueView from "./TaskIssueView";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {getTaskById} from "../../model/selectors";
import {useEditor} from "../../../../hooks/useEditor";
import {defaultTask} from "../../utils/const";
import {ITask} from "../../../../models/ITasks";
import {taskValidate} from "../../../../utils/validators";
import PhotosManager from "../../../../components/common/PhotosManager";
import Box from "@mui/material/Box";
import {fetchUpdateMachineryTask} from "../../model/actions";
import {basePath} from "../../../../api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskResultView from "./TaskResultView";

const TaskDetailsPage = () => {
    const dispatch = useAppDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const {taskId} = useParams();
    const navigate = useNavigate();
    const [expandedIssuePanel, setExpandedIssuePanel] = useState(true);
    const [expandedResultPanel, setExpandedResultPanel] = useState(false);
    const currentTask = useAppSelector(state => getTaskById(state, +taskId));
    const {
        editedValue,
        errors,
        handleFieldChange,
        resetValue,
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
    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };
    const handleDateChange = (date: any) => {
        if (date && date.isValid && date.isValid()) {
            setEditedValue(prev => ({
                ...prev,
                due_date: date.toDate().getTime(),
            }));
        }
    };
    const onAddPhoto = (newFile: File) => {
        console.log(newFile);
    };
    const onDeletePhoto = (deletedFileIndex: number) => {
        console.log(deletedFileIndex);
    };
    const photosPaths = currentTask.issue_photos.map(photo => `${basePath}/files/${photo}`);
    const saveTaskClickHandler = () => {
        dispatch(fetchUpdateMachineryTask(editedValue));
        toggleIsEditMode();
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
                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(min(500px, 100%), 1fr))",
                            gap: "16px",
                        }}
                    >
                        <TaskIssueView isEditMode={isEditMode}
                                       task={editedValue}
                                       fieldChangeHandler={handleFieldChange}
                                       handleDateChange={handleDateChange}
                                       errors={errors}
                        />
                        <PhotosManager photosPaths={photosPaths}
                                       onAddPhoto={onAddPhoto}
                                       onDeletePhoto={onDeletePhoto}
                                       isViewingOnly={!isEditMode}/>
                        {isEditMode
                            ? (<>
                                <Button variant="outlined" onClick={toggleIsEditMode}>
                                    Отменить
                                </Button>
                                <Button onClick={saveTaskClickHandler}
                                        variant={"contained"}
                                        color={"success"}
                                        disabled={false}>
                                    Сохранить
                                </Button>
                            </>)
                            : (<Button onClick={toggleIsEditMode}
                                       variant={"contained"}
                                       color={"primary"}
                                       disabled={false}>
                                Редактировать
                            </Button>)}
                    </Box>
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
                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(min(500px, 100%), 1fr))",
                            gap: "16px",
                        }}
                    >
                        <TaskResultView task={editedValue}
                                        isEditMode={isEditMode}
                                        errors={errors}
                                        fieldChangeHandler={handleFieldChange}/>
                        <PhotosManager photosPaths={photosPaths}
                                       onAddPhoto={onAddPhoto}
                                       onDeletePhoto={onDeletePhoto}
                                       isViewingOnly={!isEditMode}/>
                    </Box>
                </AccordionDetails>
            </Accordion>

        </Stack>
    );
};

export default TaskDetailsPage;