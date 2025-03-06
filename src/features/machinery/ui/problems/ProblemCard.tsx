import React, {FC, useEffect, useState} from "react";
import {IProblem} from "../../../../models/IProblems";
import {Button, Drawer, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {useEditor} from "../../../../hooks/useEditor";
import {problemValidate} from "../../../../utils/validators";
import ProblemView from "./ProblemView";
import PhotosManager from "../../../../components/common/PhotosManager";
import {basePath} from "../../../../api";
import {
    fetchDeleteProblemPhoto,
    fetchUpdateMachineryProblem,
    fetchUploadProblemPhoto,
} from "../../model/actions";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {getProblemById} from "../../model/selectors";
import {defaultProblem} from "../../utils/const";

interface IProps {
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    currentProblemId: number;
}

const ProblemCard: FC<IProps> = ({isOpen, onClose, currentProblemId}) => {
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
    if (!currentProblem) return null;
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
        dispatch(fetchUpdateMachineryProblem(editedValue));
        toggleIsEditMode();
    };

    const photosPaths = currentProblem.photos.map(photo => `${basePath}/files/${photo}`);
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box sx={{
                padding: "18px",
                width: "500px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">


                </Stack>
                <ProblemView problem={editedValue}
                             errors={errors}
                             fieldChangeHandler={handleFieldChange}
                             isEditMode={isEditMode}/>
                <PhotosManager photosPaths={photosPaths}
                               onAddPhoto={onAddPhoto}
                               onDeletePhoto={onDeletePhoto}
                               isViewingOnly={!isEditMode}/>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                    {isEditMode
                        ? (<>
                            <Button onClick={toggleIsEditMode} variant="outlined">
                                Отменить
                            </Button>
                            <Button onClick={saveClickHandler}
                                    variant="contained"
                                    color="success"
                                    disabled={!!Object.keys(errors).length}>
                                Сохранить
                            </Button>
                        </>)
                        : (<>
                            <Button variant="outlined" onClick={onClose}>
                                Закрыть
                            </Button>
                            <Button variant="contained" onClick={toggleIsEditMode}>
                                Редактировать
                            </Button>
                        </>)}
                </Stack>
            </Box>
        </Drawer>
    );
};

export default ProblemCard;