import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {
    Drawer,
    SelectChangeEvent, Stack, Typography,
} from "@mui/material";
import {fetchAddMachinery} from "../model/actions";
import {useAppDispatch} from "../../../hooks/redux";
import {MachineryStatus} from "utils/const";
import MachineryEdit from "./MachineryEdit";
import Button from "@mui/material/Button";
import Photos from "../../../components/common/Photos";
import {INewMachinery} from "../../../models/iMachinery";

interface IProps {
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface IFileWithPreview {
    file: File;
    preview: string;
}

const emptyMachinery = {
    brand: "",
    model: "",
    year_manufacture: 2010,
    type_id: 0,
    vin: "",
    state_number: "",
    status: MachineryStatus.active,
    photos: [],
};

const MachineryAddNew: FC<IProps> = ({isOpen, onClose}) => {
    const dispatch = useAppDispatch();
    const [editedMachinery, setEditedMachinery] = useState<INewMachinery>(emptyMachinery);
    const [tempFiles, setTempFiles] = useState<IFileWithPreview[]>([]);
    useEffect(() => {
        return () => {
            tempFiles.forEach(fileData => {
                URL.revokeObjectURL(fileData.preview);
            });
        };
    }, []);
    const machineryFieldChangeHandler = (e: ChangeEvent<HTMLInputElement
            | HTMLTextAreaElement>
        | SelectChangeEvent) => {
        setEditedMachinery(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const onAddPhoto = (newFile: File) => {
        const preview = URL.createObjectURL(newFile);
        setTempFiles(prev => [...prev, { file: newFile, preview }]);
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
    const handleAddClick = async () => {
        dispatch(fetchAddMachinery({
            newMachinery: editedMachinery,
            files: tempFiles.map(fileData => fileData.file),
        }));
        onClose({} as React.MouseEvent);
        tempFiles.forEach(fileData => {
            URL.revokeObjectURL(fileData.preview);
        });

        setEditedMachinery(emptyMachinery);
        setTempFiles([]);
    };
    const closeHandler = (event: React.KeyboardEvent | React.MouseEvent) => {
        tempFiles.forEach(fileData => {
            URL.revokeObjectURL(fileData.preview);
        });
        setTempFiles([]);
        onClose(event);
    };
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={closeHandler}
        >
            <Stack sx={{padding: "24px", width: "500px", height: "100%"}} spacing={3}>
                <Typography variant="h2" fontSize={"24px"} textAlign="center">
                    Новая Техника:
                </Typography>
                <Photos onAddPhoto={onAddPhoto}
                        onDeletePhoto={onDeletePhoto}
                        photosPaths={tempFiles.map(fileData => fileData.preview)}/>
                <MachineryEdit editedMachinery={editedMachinery}
                               machineryFieldChangeHandler={machineryFieldChangeHandler}/>
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

export default MachineryAddNew;
