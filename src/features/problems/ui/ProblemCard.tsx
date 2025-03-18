import React, {FC, useEffect, useState} from "react";
import {IProblem} from "../../../models/IProblems";
import {Button, Drawer, Stack, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import {useEditor} from "../../../hooks/useEditor";
import {problemValidate} from "../../../utils/validators";
import ProblemView from "./ProblemView";
import PhotosManager from "../../../components/common/PhotosManager";
import {basePath} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {defaultProblem} from "../../machinery/utils/const";
import {fetchDeleteProblemPhoto, fetchUpdateProblem, fetchUploadProblemPhoto} from "../model/actions";
import Preloader from "../../../components/Preloader";
import {getProblemById} from "../model/selectors";
import {drawerWidth} from "../../../utils/const";

interface IProps {
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    currentProblemId: number;
}

const ProblemCard: FC<IProps> = ({isOpen, onClose, currentProblemId}) => {
    const currentProblem = useAppSelector(state => getProblemById(state, currentProblemId));
    const dispatch = useAppDispatch();
    const matches_650 = useMediaQuery("(max-width:650px)");
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
        <Drawer anchor="right"
                open={isOpen}
                onClose={onClose}
                variant="temporary"
                transitionDuration={{ enter: 300, exit: 300 }}
                sx={{
                    flexShrink: 0,
                    width: matches_650 ? "400px" : "500px",
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: matches_650 ? "400px" : "500px",
                    },
                }}
        >
            <Box sx={{
                padding: "18px",

                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}>
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