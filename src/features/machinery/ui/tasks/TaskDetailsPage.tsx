import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
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
import {fetchDeleteMachineryPhoto, fetchUploadMachineryPhoto} from "../../model/actions";
import {basePath} from "../../../../api";
import Card from "@mui/material/Card";

const TaskDetailsPage = () => {
    const dispatch = useAppDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const {taskId} = useParams();
    const navigate = useNavigate();
    console.log("taskId", taskId);
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
        console.log("save");
        resetValue();
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
                {isEditMode
                    ? (<Button onClick={saveTaskClickHandler}
                               variant={"contained"}
                               color={"success"}
                               disabled={false}>
                        Сохранить
                    </Button>)
                    : (<Button onClick={toggleIsEditMode}
                               variant={"contained"}
                               color={"success"}
                               disabled={false}>
                        Редактировать
                    </Button>)}

            </Stack>
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
                <Card sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <PhotosManager photosPaths={photosPaths}
                                   onAddPhoto={onAddPhoto}
                                   onDeletePhoto={onDeletePhoto}
                                   isViewingOnly={!isEditMode}/>
                </Card>
            </Box>
        </Stack>
    );
};

export default TaskDetailsPage;