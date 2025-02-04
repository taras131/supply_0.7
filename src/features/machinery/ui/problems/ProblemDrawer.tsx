import {Drawer, SelectChangeEvent, Stack, Typography} from "@mui/material";
import ProblemEdit from "./ProblemEdit";
import ActionButtons from "./ActionButtons";
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {INewProblem, IProblem} from "../../../../models/IProblems";
import {emptyProblem} from "../../utils/const";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {getCurrentMachineryId} from "../../model/selectors";
import {getCurrentUserId} from "../../../auth/model/selectors";
import {fetchAddMachineryProblem} from "../../model/actions";
import PhotosManager from "../../../../components/common/PhotosManager";
import ProblemView from "./ProblemView";

export type DrawerMode = "create" | "edit" | "view";

interface IFileWithPreview {
    file: File;
    preview: string;
}

interface IBaseProblemDrawerProps {
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    mode: DrawerMode;
    problem: IProblem | null;
}

const ProblemDrawer: FC<IBaseProblemDrawerProps> = ({isOpen, onClose, mode, problem}) => {
    console.log(problem);
    const dispatch = useAppDispatch();
    const [editedProblem, setEditedProblem] = useState<IProblem | INewProblem>(emptyProblem);
    const [tempFiles, setTempFiles] = useState<IFileWithPreview[]>([]);
    const currentMachineryId = useAppSelector(getCurrentMachineryId);
    const currentUserId = useAppSelector(getCurrentUserId);
    useEffect(() => {
        if (problem) {
            setEditedProblem(problem);
        } else {
            setEditedProblem(emptyProblem);
        }
    }, [problem]);
    const problemFieldChangeHandler = (e: ChangeEvent<HTMLInputElement
            | HTMLTextAreaElement>
        | SelectChangeEvent) => {
        setEditedProblem(prev => ({...prev, [e.target.name]: e.target.value}));
        if (e.target.name === "category_id") {
            setEditedProblem(prev => ({...prev, subcategory_id: 0}));
        }
    };
    const closeHandler = (event: React.KeyboardEvent | React.MouseEvent) => {
        tempFiles.forEach(fileData => {
            URL.revokeObjectURL(fileData.preview);
        });
        setTempFiles([]);
        onClose(event);
    };
    const onAddPhoto = (newFile: File) => {
        const preview = URL.createObjectURL(newFile);
        setTempFiles(prev => [...prev, {file: newFile, preview}]);
    };
    const onDeletePhoto = (deletedFileIndex: number) => {
        setTempFiles(prev => {
            const fileToDelete = prev[deletedFileIndex];
            if (fileToDelete) {
                URL.revokeObjectURL(fileToDelete.preview);
            }
            return prev.filter((_, index) => index !== deletedFileIndex);
        });
    };
    const addClickHandler = () => {
        dispatch(fetchAddMachineryProblem({
            newProblem: {
                ...editedProblem, machinery_id: currentMachineryId ? currentMachineryId : 0
                , author_id: currentUserId,
            },
            files: tempFiles.map(fileData => fileData.file),
        }));
    };
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Stack sx={{padding: "24px", width: "500px", height: "100%"}} spacing={3}>
                <Typography variant="h2" fontSize={"24px"} textAlign="center">
                    {mode === "create" ? "Новое замечание:" : "Редактирование замечания:"}
                </Typography>
                {mode === "view"  ? (
                    <ProblemView problem={problem}/> // компонент для просмотра
                ) : (
                    <ProblemEdit
                        editedProblem={editedProblem}
                        problemFieldChangeHandler={problemFieldChangeHandler}
                    />
                )}
                {mode === "create" ? (
                    <PhotosManager
                        onAddPhoto={onAddPhoto}
                        onDeletePhoto={onDeletePhoto}
                        photosPaths={tempFiles.map(fileData => fileData.preview)}
                    />
                ) : (
                    <PhotosManager
                        onAddPhoto={onAddPhoto}
                        onDeletePhoto={onDeletePhoto}
                        photosPaths={editedProblem.photos}
                    />
                )}
                <ActionButtons
                    mode={mode}
                    onSave={addClickHandler}
                    onClose={onClose}
                />
            </Stack>
        </Drawer>
    );
};

export default ProblemDrawer;

