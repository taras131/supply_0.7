import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../../../utils/routes";
import TaskIssueView from "./TaskIssueView";
import {useEditor} from "../../../../hooks/useEditor";
import {newTaskValidate} from "../../../../utils/validators";
import {INewTask} from "../../../../models/ITasks";
import {emptyTask} from "../../utils/const";
import Box from "@mui/material/Box";
import PhotosManager from "../../../../components/common/PhotosManager";
import usePhotoManager from "../../../../hooks/usePhotoManager";
import {fetchAddMachineryTask} from "../../model/actions";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {getCurrentMachineryId} from "../../model/selectors";
import {getCurrentUserId} from "../../../auth/model/selectors";
import Card from "@mui/material/Card";

const TaskAddNewPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentMachineryId = useAppSelector(getCurrentMachineryId);
    const currentUserId = useAppSelector(getCurrentUserId);
    const {tempFiles, onAddPhoto, onDeletePhoto, clearPhotos} = usePhotoManager();
    const location = useLocation();
    const problemId = location.state?.problemId;
    const {
        editedValue,
        errors,
        handleFieldChange,
        setEditedValue,
        resetValue,
    } = useEditor<INewTask>({initialValue: JSON.parse(JSON.stringify(emptyTask)), validate: newTaskValidate});
    useEffect(() => {
        if (problemId) {
            setEditedValue(prev => ({...prev, problem_id: problemId, type_id: 2}));
        }
    }, [problemId]);
    useEffect(() => {
        const today = new Date();
        setEditedValue(prev => ({
            ...prev,
            due_date: today.getTime(),
        }));
        return () => clearPhotos();
    }, []);
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
        const newTask = {
            ...editedValue, machinery_id: currentMachineryId ? currentMachineryId : 0
            , author_id: currentUserId,
        };
        await dispatch(fetchAddMachineryTask({newTask, files: newFiles}));
        resetValue();
        clearPhotos();
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
                        disabled={false}>
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
                <TaskIssueView task={editedValue}
                               errors={errors}
                               isEditMode={true}
                               fieldChangeHandler={handleFieldChange}
                               handleDateChange={handleDateChange}/>
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