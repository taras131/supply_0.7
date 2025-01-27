import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {SelectChangeEvent, Stack} from "@mui/material";
import {INewTask, ITask} from "../../../../models/ITasks";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import Photos from "../../../../components/common/Photos";
import Button from "@mui/material/Button";
import {fetchAddMachineryTask, fetchUpdateMachineryTask} from "../../model/actions";
import {getCurrentMachineryId} from "../../model/selectors";
import TaskIssueEdit from "./TaskIssueEdit";
import TaskResultEdit from "./TaskResultEdit";
import {isTask} from "../../../../utils/services";
import {filesPath} from "../../../../api/files";




interface IProps {
    task: ITask | INewTask;
    onClose: (e: React.KeyboardEvent | React.MouseEvent) => void;
}

const TaskEdit: FC<IProps> = ({task, onClose}) => {
    const dispatch = useAppDispatch();
    const machineryId = useAppSelector(getCurrentMachineryId);
    const [editedTask, setEditedTask] = useState<ITask | INewTask>(task);
    const [photos, setPhotos] = useState<File[]>([]);
    const [photosPreview, setPhotosPreview] = useState<string[]>([]);
    useEffect(() => {
        if (editedTask) {
            setEditedTask(editedTask);
        }
    }, [task]);
    useEffect(() => {
        if (task.issue_photos?.length) {
            // Установка превью для существующих фотографий
            const existingPhotoPreviews = task.issue_photos.map(photo =>
                `${filesPath}/${photo}`
            );
            setPhotosPreview(existingPhotoPreviews);
        }
    }, [task, filesPath]);
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
    const addTaskHandler = (e: React.KeyboardEvent | React.MouseEvent) => {
        if (editedTask.id) {
            dispatch(fetchUpdateMachineryTask(editedTask));
        } else {
            const formData = new FormData();
            photos.forEach(photo => {
                formData.append("file", photo);
            });
            dispatch(fetchAddMachineryTask({
                newTask: machineryId ? {...editedTask, machinery_id: machineryId} : editedTask,
                formData: formData,
            }));
        }
        onClose(e);
    };
    if (!editedTask) return null;
    return (
        <Stack spacing={2}>
            <TaskIssueEdit editedTask={editedTask}
                           handleDateChange={handleDateChange}
                           taskFieldChangeHandler={taskFieldChangeHandler}/>
            <Photos
                photoPaths={photosPreview}
                onDeletePhoto={onDeletePhoto}
                photoUploadHandler={photoUploadHandler}
            />
            {isTask(editedTask) && editedTask.status_id === 2 && (
                <TaskResultEdit editedTask={editedTask}
                                handleDateChange={handleDateChange}
                                taskFieldChangeHandler={taskFieldChangeHandler}/>
            )}
            <Button variant="contained" color="success" onClick={addTaskHandler} sx={{mt: "auto"}}>
                Сохранить
            </Button>
        </Stack>
    );
};

export default TaskEdit;