import React, {FC, useEffect, useState} from "react";
import {IProblem} from "../../../models/IProblems";
import {useEditor} from "../../../hooks/useEditor";
import {problemValidate} from "../../../utils/validators";
import ProblemView from "./ProblemView";
import PhotosManager from "../../../components/common/PhotosManager";
import {basePath} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchDeleteProblemPhoto, fetchUpdateProblem, fetchUploadProblemPhoto} from "../model/actions";
import Preloader from "../../../components/Preloader";
import {getProblemById} from "../model/selectors";
import ActionsEditButtons from "../../../components/common/ActionsEditButtons";
import {defaultProblem} from "../utils/consts";
import {Button, ButtonGroup, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";

interface IProps {
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    currentProblemId: number;
}

const ProblemCard: FC<IProps> = ({onClose, currentProblemId}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentProblem = useAppSelector(state => getProblemById(state, currentProblemId));
    const [isEditMode, setIsEditMode] = useState(false);
    const {
        editedValue,
        errors,
        handleFieldChange,
        setEditedValue,
    } = useEditor<IProblem>({initialValue: currentProblem || defaultProblem, validate: problemValidate});
    useEffect(() => {
        if (currentProblem) {
            setEditedValue(currentProblem);
        }
    }, [currentProblem]);
    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };
    if (!currentProblem) return (<Preloader/>);
    const onAddPhoto = (newFile: File) => {
        dispatch(fetchUploadProblemPhoto({problem: currentProblem, file: newFile}));
        toggleIsEditMode();
    };
    const onDeletePhoto = (deletedFileIndex: number) => {
        dispatch(fetchDeleteProblemPhoto({
            problem: currentProblem
            , deletePhotoName: currentProblem.photos[deletedFileIndex],
        }));
        toggleIsEditMode();
    };
    const saveClickHandler = () => {
        dispatch(fetchUpdateProblem(editedValue));
        toggleIsEditMode();
    };
    const createTaskClickHandler = () => {
        navigate(routes.machineryAddTask, {
            state: {
                problemId: editedValue.id,
                machineryId: editedValue.machinery_id,
                priorityId: editedValue.priority_id,
                taskTypeId: 2,
            },
        });
    };
    const handleStatusChange = (newStatusId: number) => {
        dispatch(fetchUpdateProblem({...editedValue, status_id: newStatusId}));
    };
    const photosPaths = currentProblem.photos.map(photo => `${basePath}/files/${photo}`);
    return (
        <>
            {!isEditMode && (
                <Stack direction="row"
                       alignItems="center"
                       justifyContent="space-between"
                       spacing={2}>
                    <Button variant="text"
                            size="small"
                            onClick={createTaskClickHandler}
                            startIcon={<AddIcon/>}>
                        Задача
                    </Button>
                    <ButtonGroup variant="outlined" aria-label="Basic button group" size="small">
                        <Button color={editedValue.status_id === 1 ? "warning" : "primary"}
                                variant={editedValue.status_id === 1 ? "contained" : "outlined"}
                                onClick={() => handleStatusChange(1)}>
                            Новая
                        </Button>
                        <Button
                            variant={editedValue.status_id === 2 ? "contained" : "outlined"}
                            onClick={() => handleStatusChange(2)}>
                            В работе
                        </Button>
                        <Button color={editedValue.status_id === 3 ? "success" : "primary"}
                                variant={editedValue.status_id === 3 ? "contained" : "outlined"}
                                onClick={() => handleStatusChange(3)}>
                            Завершена
                        </Button>
                    </ButtonGroup>
                </Stack>
            )}
            <ProblemView problem={editedValue}
                         errors={errors}
                         fieldChangeHandler={handleFieldChange}
                         isEditMode={isEditMode}/>
            <PhotosManager photosPaths={photosPaths}
                           onAddPhoto={onAddPhoto}
                           onDeletePhoto={onDeletePhoto}
                           isViewingOnly={!isEditMode}/>
            <ActionsEditButtons isEditMode={isEditMode}
                                disabled={!!Object.keys(errors).length}
                                toggleIsEditMode={toggleIsEditMode}
                                onClose={onClose}
                                saveClickHandler={saveClickHandler}/>
        </>
    );
};

export default ProblemCard;