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

interface IProps {
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    currentProblemId: number;
}

const ProblemCard: FC<IProps> = ({onClose, currentProblemId}) => {
    const currentProblem = useAppSelector(state => getProblemById(state, currentProblemId));
    const dispatch = useAppDispatch();
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

    const photosPaths = currentProblem.photos.map(photo => `${basePath}/files/${photo}`);
    return (
        <>
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