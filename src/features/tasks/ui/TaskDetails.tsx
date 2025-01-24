import React, {ChangeEvent, FC, useState} from "react";
import {Drawer, SelectChangeEvent, Stack, Divider, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Photos from "../../../components/common/Photos";
import Button from "@mui/material/Button";
import {ITask, taskPriority} from "../../../models/ITasks";
import {filesPath} from "../../../api/files";
import TextField from "@mui/material/TextField";
import {useAppSelector} from "../../../hooks/redux";
import {getUserById} from "../../users/model/selectors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const TaskDetails: FC<IProps> = ({isOpen, toggleDrawer, task}) => {
    const author = useAppSelector(state => getUserById(state, task.author_id));
    const assigned_to = useAppSelector(state => getUserById(state, task.assigned_to_id));
    const [editedTask, setEditedTask] = useState(task);
    const [photos, setPhotos] = useState<File[]>([]);
    const [photosPreview, setPhotosPreview] = useState<string[]>([]);

    const taskFieldChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        setEditedTask(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const photoUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newPhotos = Array.from(e.target.files);
        const newPhotosPreview = newPhotos.map(file => URL.createObjectURL(file));
        setPhotos(prev => [...prev, ...newPhotos]);
        setPhotosPreview(prev => [...prev, ...newPhotosPreview]);
    };

    const onDeletePhoto = (photoIndex: number) => {
        setPhotos(prev => prev.filter((_, index) => index !== photoIndex));
        setPhotosPreview(prev => prev.filter((_, index) => index !== photoIndex));
    };

    const photoPaths = task.issue_photos?.map(photo => `${filesPath}/${photo}`) || null;

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer(false)}
        >
            <Box
                role="presentation"
                sx={{
                    width: "600px",
                    height: "100vh",
                    backgroundColor: "#f5f5f5",
                    overflowY: "auto",
                }}
            >
                <Paper sx={{
                    p: 3,
                    m: 2,
                    borderRadius: 2,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}>
                    <Stack spacing={3}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AssignmentIcon color="primary" />
                            <Typography variant="h5" fontWeight="bold">
                                {task.title}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box sx={{ bgcolor: "#f8f9fa", p: 2, borderRadius: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                                Описание задачи:
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {task.description}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                            <Box sx={{ minWidth: "45%" }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Срочность
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                    {taskPriority[task.priority_id].title}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    Исполнитель
                                </Typography>
                                <Typography variant="body1">
                                    {assigned_to && `${assigned_to.first_name} ${assigned_to.middle_name}`}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    Автор
                                </Typography>
                                <Typography variant="body1">
                                    {author && `${author.first_name} ${author.middle_name}`}
                                </Typography>
                            </Box>
                        </Box>

                        {photoPaths && (
                            <Box>
                                <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                    <PhotoLibraryIcon color="primary" />
                                    Прикрепленные фото
                                </Typography>
                                <Photos photoPaths={photoPaths} isViewingOnly={true} />
                            </Box>
                        )}

                        <Divider />

                        <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CheckCircleIcon color="success" />
                                Результат выполнения
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Потраченные ресурсы"
                                    variant="outlined"
                                    name="spent_resources"
                                    onChange={taskFieldChangeHandler}
                                    value={editedTask.spent_resources}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Описание результата"
                                    variant="outlined"
                                    name="result_description"
                                    onChange={taskFieldChangeHandler}
                                    value={editedTask.result_description}
                                />
                                <Box>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Фото результата
                                    </Typography>
                                    <Photos
                                        photoPaths={photosPreview}
                                        onDeletePhoto={onDeletePhoto}
                                        photoUploadHandler={photoUploadHandler}
                                    />
                                </Box>
                            </Stack>
                        </Box>

                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                startIcon={<CheckCircleIcon />}
                                onClick={toggleDrawer(false)}
                            >
                                Завершить
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                startIcon={<CloseIcon />}
                                onClick={toggleDrawer(false)}
                            >
                                Закрыть
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </Drawer>
    );
};

export default TaskDetails;
