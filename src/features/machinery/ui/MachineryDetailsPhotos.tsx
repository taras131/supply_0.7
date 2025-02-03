import React, {FC} from "react";
import {fetchDeleteMachineryPhoto, fetchUploadMachineryPhoto} from "../model/actions";
import {ICurrentMachinery} from "../../../models/iMachinery";
import {useAppDispatch} from "../../../hooks/redux";
import Photos from "../../../components/common/Photos";
import {basePath} from "../../../api";

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
        console.log(deletedFileIndex);
        console.log(machinery.photos[deletedFileIndex]);
        dispatch(fetchDeleteMachineryPhoto({
            machinery
            , deletePhotoName: machinery.photos[deletedFileIndex],
        }));
    };
    const photosPaths = machinery.photos.map(photo => `${basePath}/files/${photo}`);
    return (
        <Photos photosPaths={photosPaths}
                onAddPhoto={onAddPhoto}
                onDeletePhoto={onDeletePhoto}
                isViewingOnly={!isEditMode}/>
    );
};

export default MachineryDetailsPhotos;