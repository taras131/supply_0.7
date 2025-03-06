import React, {FC} from "react";
import {fetchDeleteMachineryPhoto, fetchUploadMachineryPhoto} from "../model/actions";
import {ICurrentMachinery} from "../../../models/iMachinery";
import {useAppDispatch} from "../../../hooks/redux";
import PhotosManager from "../../../components/common/PhotosManager";
import {basePath} from "../../../api";
import Card from "@mui/material/Card";

interface IProps {
    machinery: ICurrentMachinery;
    isEditMode: boolean;
}

const MachineryDetailsPhotos: FC<IProps> = ({machinery, isEditMode}) => {
    const dispatch = useAppDispatch();
    const onAddPhoto = (newFile: File) => {
        dispatch(fetchUploadMachineryPhoto({machinery, file: newFile}));
    };
    const onDeletePhoto = (deletedFileIndex: number) => {
        dispatch(fetchDeleteMachineryPhoto({
            machinery
            , deletePhotoName: machinery.photos[deletedFileIndex],
        }));
    };
    const photosPaths = machinery.photos.map(photo => `${basePath}/files/${photo}`);
    return (
        <Card sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <PhotosManager photosPaths={photosPaths}
                           onAddPhoto={onAddPhoto}
                           onDeletePhoto={onDeletePhoto}
                           isViewingOnly={!isEditMode}/>
        </Card>
    );
};

export default MachineryDetailsPhotos;