import React, {FC, useEffect} from "react";
import {Button, Drawer, Stack, Typography} from "@mui/material";
import ProblemView from "./ProblemView";
import {INewProblem} from "../../../../models/IProblems";
import {useEditor} from "../../../../hooks/useEditor";
import {emptyProblem} from "../../utils/const";
import {problemValidate} from "../../../../utils/validators";
import {fetchAddMachineryProblem} from "../../model/actions";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {getCurrentMachineryId} from "../../model/selectors";
import {getCurrentUserId} from "../../../auth/model/selectors";
import usePhotoManager from "../../../../hooks/usePhotoManager";
import PhotosManager from "../../../../components/common/PhotosManager";
import Box from "@mui/material/Box";

interface IProps {
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const ProblemAddNew: FC<IProps> = ({isOpen, onClose}) => {
    const dispatch = useAppDispatch();
    const {tempFiles, onAddPhoto, onDeletePhoto, clearPhotos} = usePhotoManager();
    const {
        editedValue,
        errors,
        handleFieldChange,
        resetValue,
    } = useEditor<INewProblem>({initialValue: JSON.parse(JSON.stringify(emptyProblem)), validate: problemValidate});
    const currentMachineryId = useAppSelector(getCurrentMachineryId);
    const currentUserId = useAppSelector(getCurrentUserId);
    useEffect(() => {
        return () => clearPhotos();
    }, []);
    const addClickHandler = async () => {
        const newFiles = [...tempFiles.map(fileData => fileData.file)];
        const newProblem = {
            ...editedValue, machinery_id: currentMachineryId ? currentMachineryId : 0
            , author_id: currentUserId,
        };
        clearPhotos();
        resetValue();
        await dispatch(fetchAddMachineryProblem({
            newProblem,
            files: newFiles,
        }));
        onClose();
    };
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box sx={{
                padding: "16px",
                width: "500px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}>
                <Typography color="primary" variant="h2" fontSize={"20px"} fontWeight={600} sx={{marginBottom: "8px"}}>
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
            </Box>
        </Drawer>
    );
};

export default ProblemAddNew;