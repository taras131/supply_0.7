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
import TaskResultView from "./TaskResultView";

interface IProps {
    editedValue: ITask | null;
    errors?: ValidationErrors;
    fieldChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void;
    handleDateChange: (date: any) => void;
    viewType: "issue" | "result";
}

const TaskDetails: FC<IProps> = ({
                                     editedValue,
                                     errors,
                                     fieldChangeHandler,
                                     handleDateChange,
                                     viewType,
                                 }) => {
    const dispatch = useAppDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    if (!editedValue) return null;
    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };
    const onAddPhoto = (newFile: File) => {
        const type = viewType === "issue" ? "issue_photos" : "result_photos";
        dispatch(fetchUploadTaskPhoto({task: editedValue, file: newFile, type}));
        toggleIsEditMode();
    };
    const onDeletePhoto = (deletedFileIndex: number) => {
        const type = viewType === "issue" ? "issue_photos" : "result_photos";
        const deletePhotoName = viewType === "issue"
            ? editedValue.issue_photos[deletedFileIndex]
            : editedValue.result_photos?.[deletedFileIndex];
        dispatch(fetchDeleteTaskPhoto({
            task: editedValue,
            deletePhotoName: deletePhotoName,
            type,
        }));
        toggleIsEditMode();
    };
    const saveTaskClickHandler = () => {
        const updatedTask = viewType === "result"
            ? {...editedValue, status_id: 3}
            : editedValue;
        dispatch(fetchUpdateMachineryTask(updatedTask));
        toggleIsEditMode();
    };
    const photosPaths = (viewType === "issue"
            ? editedValue.issue_photos
            : editedValue.result_photos || []
    ).map(photo => `${basePath}/files/${photo}`);
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
                {viewType === "issue" ? (
                    <TaskIssueView
                        isEditMode={isEditMode}
                        task={editedValue}
                        fieldChangeHandler={fieldChangeHandler}
                        handleDateChange={handleDateChange}
                        errors={errors}
                    />
                ) : (
                    <TaskResultView
                        isEditMode={isEditMode}
                        task={editedValue}
                        fieldChangeHandler={fieldChangeHandler}
                        errors={errors}
                    />
                )}
                <PhotosManager
                    photosPaths={photosPaths}
                    onAddPhoto={onAddPhoto}
                    onDeletePhoto={onDeletePhoto}
                    isViewingOnly={!isEditMode}
                />
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
                                size="small"
                                disabled={errors && !!Object.keys(errors).length}
                        >
                            Сохранить
                        </Button>
                    </>)
                    : (<Button onClick={toggleIsEditMode}
                               variant={"contained"}
                               color={"primary"}
                               size="small">
                        Редактировать
                    </Button>)}
            </Stack>
        </>
    );
};

export default TaskDetails;