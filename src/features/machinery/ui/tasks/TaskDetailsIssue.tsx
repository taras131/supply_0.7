import React, {ChangeEvent, FC, useState} from "react";
import Box from "@mui/material/Box";
import TaskIssueView from "./TaskIssueView";
import PhotosManager from "../../../../components/common/PhotosManager";
import Button from "@mui/material/Button";
import {ITask} from "../../../../models/ITasks";
import {SelectChangeEvent, Stack} from "@mui/material";
import {ValidationErrors} from "../../../../utils/validators";
import {basePath} from "../../../../api";
import {fetchDeleteTaskPhoto, fetchUpdateMachineryTask, fetchUploadTaskPhoto} from "../../model/actions";
import {useAppDispatch} from "../../../../hooks/redux";

interface IProps {
    editedValue: ITask
    handleDateChange: (date: any) => void;
    fieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void
    errors?: ValidationErrors;
}

const TaskDetailsIssue: FC<IProps> = ({editedValue, handleDateChange, fieldChangeHandler, errors}) => {
    const dispatch = useAppDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };
    const onAddPhoto = (newFile: File) => {
        dispatch(fetchUploadTaskPhoto({task: editedValue, file: newFile, type: "issue_photos"}));
        toggleIsEditMode();
    };
    const onDeletePhoto = (deletedFileIndex: number) => {
        dispatch(fetchDeleteTaskPhoto({
            task: editedValue,
            deletePhotoName: editedValue.issue_photos[deletedFileIndex],
            type: "issue_photos",
        }));
        toggleIsEditMode();
    };
    const saveTaskClickHandler = () => {
        dispatch(fetchUpdateMachineryTask(editedValue));
        toggleIsEditMode();
    };
    const photosPaths = editedValue.issue_photos.map(photo => `${basePath}/files/${photo}`);
    return (
        <>
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
                               fieldChangeHandler={fieldChangeHandler}
                               handleDateChange={handleDateChange}
                               errors={errors}
                />
                <Stack alignItems="center" justifyContent="center">
                    <PhotosManager photosPaths={photosPaths}
                                   onAddPhoto={onAddPhoto}
                                   onDeletePhoto={onDeletePhoto}
                                   isViewingOnly={!isEditMode}/>
                </Stack>
            </Box>
            <Stack direction="row" alignItems="center" justifyContent="end" spacing={2}>
                {isEditMode
                    ? (<>
                        <Button variant="outlined" onClick={toggleIsEditMode} size="small">
                            Отменить
                        </Button>
                        <Button onClick={saveTaskClickHandler}
                                variant={"contained"}
                                color={"success"}
                                disabled={false}
                                size="small">
                            Сохранить
                        </Button>
                    </>)
                    : (<Button onClick={toggleIsEditMode}
                               variant={"contained"}
                               color={"primary"}
                               disabled={false}
                               size="small">
                        Редактировать
                    </Button>)}
            </Stack>
        </>
    );
};

export default TaskDetailsIssue;