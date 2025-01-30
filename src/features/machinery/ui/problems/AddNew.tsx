import React, {ChangeEvent, FC, useState} from "react";
import {Drawer, SelectChangeEvent, Stack, Typography} from "@mui/material";
import Photos from "../../../../components/common/Photos";
import MachineryEdit from "../MachineryEdit";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {INewProblem} from "../../../../models/IProblems";
import ProblemEdit from "./ProblemEdit";
import {fetchAddMachineryProblem} from "../../model/actions";
import {getCurrentMachineryId} from "../../model/selectors";
import {getCurrentUserId} from "../../../auth/model/selectors";

const emptyProblem: INewProblem = {
    title: "",
    description: "",
    photos: [],
    author_id: 0,
    machinery_id: 0,
    priority_id: 0,
};

interface IFileWithPreview {
    file: File;
    preview: string;
}

interface IProps {
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const AddNew: FC<IProps> = ({isOpen, onClose}) => {
    const dispatch = useAppDispatch();
    const [editedProblem, setEditedProblem] = useState<INewProblem>(emptyProblem);
    const [tempFiles, setTempFiles] = useState<IFileWithPreview[]>([]);
    const currentMachineryId = useAppSelector(getCurrentMachineryId);
    const currentUserId = useAppSelector(getCurrentUserId);
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
    const problemFieldChangeHandler = (e: ChangeEvent<HTMLInputElement
            | HTMLTextAreaElement>
        | SelectChangeEvent) => {
        setEditedProblem(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleAddClick = () => {
        dispatch(fetchAddMachineryProblem({
            newProblem: {
                ...editedProblem, machinery_id: currentMachineryId ? currentMachineryId : 0
                , author_id: currentUserId,
            },
            files: tempFiles.map(fileData => fileData.file),
        }));
    };
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={closeHandler}
        >
            <Stack sx={{padding: "24px", width: "500px", height: "100%"}} spacing={3}>
                <Typography variant="h2" fontSize={"24px"} textAlign="center">
                    Новое замечание:
                </Typography>
                <Photos onAddPhoto={onAddPhoto}
                        onDeletePhoto={onDeletePhoto}
                        photosPaths={tempFiles.map(fileData => fileData.preview)}/>
                <ProblemEdit editedProblem={editedProblem}
                             problemFieldChangeHandler={problemFieldChangeHandler}/>
                <Stack direction="row"
                       alignItems="center"
                       justifyContent="space-between"
                       sx={{marginTop: "auto"}}>
                    <Button onClick={closeHandler} variant={"outlined"}>
                        Назад
                    </Button>
                    <Button onClick={handleAddClick} variant={"contained"} color={"success"}
                            sx={{marginLeft: "10px"}}>
                        Сохранить
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    );
};

export default AddNew;