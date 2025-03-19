import React, {FC, useEffect} from "react";
import {Button, Stack, Typography} from "@mui/material";
import ProblemView from "./ProblemView";
import {INewProblem} from "../../../models/IProblems";
import {useEditor} from "../../../hooks/useEditor";
import {problemValidate} from "../../../utils/validators";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCurrentUserId} from "../../auth/model/selectors";
import usePhotoManager from "../../../hooks/usePhotoManager";
import PhotosManager from "../../../components/common/PhotosManager";
import {fetchAddProblem} from "../model/actions";
import {useParams} from "react-router-dom";
import {emptyProblem} from "../utils/consts";

interface IProps {
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const ProblemAddNew: FC<IProps> = ({onClose}) => {
    const dispatch = useAppDispatch();
    const {tempFiles, onAddPhoto, onDeletePhoto, clearPhotos} = usePhotoManager();
    const {
        editedValue,
        errors,
        handleFieldChange,
        resetValue,
        setEditedValue,
    } = useEditor<INewProblem>({initialValue: JSON.parse(JSON.stringify(emptyProblem)), validate: problemValidate});
    const machineryId = useParams().machineryId || "0";
    const currentUserId = useAppSelector(getCurrentUserId);
    useEffect(() => {
        return () => clearPhotos();
    }, []);
    useEffect(() => {
        if (machineryId) {
            setEditedValue(prev => ({...prev, machinery_id: +machineryId}));
        } else {
            setEditedValue(prev => ({...prev, machinery_id: -1}));
        }
    }, [machineryId]);
    const addClickHandler = async (e: React.MouseEvent) => {
        const newFiles = [...tempFiles.map(fileData => fileData.file)];
        const newProblem = {...editedValue, author_id: currentUserId};
        clearPhotos();
        resetValue();
        await dispatch(fetchAddProblem({
            newProblem,
            files: newFiles,
        }));
        onClose(e);
    };
    return (
        <>
            <Typography color="primary" variant="h2" fontSize={"18px"} fontWeight={600} sx={{marginBottom: "8px"}}>
                Новая проблема
            </Typography>
            <ProblemView problem={editedValue}
                         errors={errors}
                         fieldChangeHandler={handleFieldChange}
                         isEditMode={true}/>
            <PhotosManager onAddPhoto={onAddPhoto}
                           onDeletePhoto={onDeletePhoto}
                           photosPaths={tempFiles.map(fileData => fileData.preview)}/>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button onClick={onClose} variant="outlined">
                    Назад
                </Button>
                <Button onClick={addClickHandler}
                        variant="contained"
                        color="success"
                        disabled={!!Object.keys(errors).length}>
                    Сохранить
                </Button>
            </Stack>
        </>
    );
};

export default ProblemAddNew;