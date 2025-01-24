import React, {ChangeEvent, FC, useState} from "react";
import {Drawer, SelectChangeEvent, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TasksEdit from "./TasksEdit";
import Photos from "../../../components/common/Photos";
import {useAppDispatch} from "../../../hooks/redux";
import {fetchAddTask} from "../model/actions";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";


interface IProps {
    isOpen: boolean
    toggleDrawer: (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
    machineryId?: number | null
}

const TasksAddNew: FC<IProps> = ({isOpen, toggleDrawer, machineryId}) => {
    const dispatch = useAppDispatch();
    const [editedTask, setEditedTask] = useState({
        title: "",
        description: "",
        status_id: 0,
        priority_id: 0,
        due_date: dayjs().valueOf(),
        author_id: 1,
        assigned_to_id: 2,
        issue_photos: [],

    });
    const [photos, setPhotos] = useState<File[]>([]);
    const [photosPreview, setPhotosPreview] = useState<string[]>([]);
    const taskFieldChangeHandler = (e: ChangeEvent<HTMLInputElement
            | HTMLTextAreaElement>
        | SelectChangeEvent) => {
        setEditedTask(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setEditedTask(prev => ({
                ...prev,
                due_date: date.valueOf(), // преобразуем дату в миллисекунды
            }));
        }
    };
    const photoUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newPhotos = Array.from(e.target.files); // Получаем файлы из input
        const newPhotosPreview = newPhotos.map(file => URL.createObjectURL(file)); // Превью для каждого файла
        setPhotos(prev => [...prev, ...newPhotos]); // Сохраняем файлы в state
        setPhotosPreview(prev => [...prev, ...newPhotosPreview]); // Сохраняем превью в state
    };
    const onDeletePhoto = (photoIndex: number) => {
        setPhotos(prev => prev.filter((_, index) => index !== photoIndex)); // Удаляем файл из массив `photos`
        setPhotosPreview(prev => prev.filter((_, index) => index !== photoIndex)); // Удаляем превью фотографии
    };
    const addTaskHandler = () => {
        const formData = new FormData();
        photos.forEach(photo => {
            formData.append("file", photo);
        });
        dispatch(fetchAddTask({
            newTask: machineryId ? {...editedTask, machinery_id: machineryId} : editedTask,
            formData: formData,
        }));
    };
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleDrawer(false)}
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
                <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" gutterBottom>
                            Добавить задачу
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                            <DatePicker
                                sx={{width: "150px"}}
                                label="Срок выполнения"
                                value={dayjs(editedTask.due_date)} // оборачиваем миллисекунды в dayjs
                                onChange={handleDateChange}
                                format="DD.MM.YYYY"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "outlined",
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Stack>
                    <TasksEdit editedTask={editedTask} taskFieldChangeHandler={taskFieldChangeHandler}/>
                    <Photos
                        photoPaths={photosPreview}
                        onDeletePhoto={onDeletePhoto}
                        photoUploadHandler={photoUploadHandler}
                    />
                    <Button variant="contained" color="success" onClick={addTaskHandler} sx={{mt: "auto"}}>
                        Сохранить
                    </Button>
                    <Button variant="contained" color="secondary" onClick={toggleDrawer(false)} sx={{mt: "auto"}}>
                        Отменить
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default TasksAddNew;