import React, {useEffect, useRef} from "react";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import TaskIssueView from "./TaskIssueView";
import {useEditor} from "../../../hooks/useEditor";
import {newTaskValidate} from "../../../utils/validators";
import {INewTask} from "../../../models/ITasks";
import Box from "@mui/material/Box";
import PhotosManager from "../../../components/common/PhotosManager";
import usePhotoManager from "../../../hooks/usePhotoManager";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCurrentUserId} from "../../auth/model/selectors";
import Card from "@mui/material/Card";
import {fetchAddTask} from "../model/actions";
import {emptyTask} from "../utils/consts";

const TaskAddNewPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUserId = useAppSelector(getCurrentUserId);
    const isInitialRenderRef = useRef(true);
    const {tempFiles, onAddPhoto, onDeletePhoto, clearPhotos} = usePhotoManager();
    const location = useLocation();
    const machineryId = location.state?.machineryId;
    const problemId = location.state?.problemId;
    const taskTypeId = location.state?.taskTypeId;
    const priorityId = location.state?.priorityId;
    const {
        editedValue,
        errors,
        handleFieldChange,
        setEditedValue,
        resetValue,
        validateValue,
    } = useEditor<INewTask>({initialValue: JSON.parse(JSON.stringify(emptyTask)), validate: newTaskValidate});
    useEffect(() => {
        const today = new Date();
        setEditedValue(prev => ({
            ...prev,
            due_date: today.getTime(),
            ...(machineryId && {machinery_id: machineryId}),
            ...(problemId && {problem_id: problemId}),
            ...(taskTypeId && {type_id: taskTypeId}),
            ...(priorityId && {priority_id: priorityId}),
        }));
        return () => clearPhotos();
    }, [machineryId, problemId, taskTypeId, priorityId]);
    useEffect(() => {
        if (editedValue.problem_id !== -1 && !isInitialRenderRef.current) {
            setEditedValue((prev) => ({...prev, problem_id: -1}));
        }
        if (isInitialRenderRef.current && editedValue.machinery_id > 0) {
            isInitialRenderRef.current = false;
        }
    }, [editedValue.machinery_id]);
    useEffect(() => {
        validateValue();
    }, [editedValue]);
    const handleDateChange = (date: any) => {
        if (date && date.isValid && date.isValid()) {
            setEditedValue(prev => ({
                ...prev,
                due_date: date.toDate().getTime(),
            }));
        }
    };
    const handleAddClick = async () => {
        const newFiles = [...tempFiles.map(fileData => fileData.file)];
        const newTask = {...editedValue, author_id: currentUserId};
        await dispatch(fetchAddTask({newTask, files: newFiles}));
        resetValue();
        clearPhotos();
        navigate(-1);
    };
    return (
        <div>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button variant="outlined"
                        onClick={() => navigate(-1)}>
                    Назад
                </Button>
                <Typography variant="h2" fontSize={"24px"} textAlign="center">
                    Новая задача:
                </Typography>
                <Button onClick={handleAddClick}
                        variant={"contained"}
                        color={"success"}
                        disabled={!!Object.keys(errors).length}>
                    Сохранить
                </Button>
            </Stack>
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(500px, 100%), 1fr))",
                    gap: "16px",
                    marginTop: "24px",
                }}
            >
                <Card>
                    <TaskIssueView task={editedValue}
                                   errors={errors}
                                   isEditMode={true}
                                   fieldChangeHandler={handleFieldChange}
                                   handleDateChange={handleDateChange}/>
                </Card>
                <Card sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <PhotosManager onAddPhoto={onAddPhoto}
                                   onDeletePhoto={onDeletePhoto}
                                   photosPaths={tempFiles.map(fileData => fileData.preview)}/>
                </Card>

            </Box>
        </div>
    );
};

export default TaskAddNewPage;