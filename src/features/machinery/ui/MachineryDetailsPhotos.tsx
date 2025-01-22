import React, {FC} from "react";
import {fetchDeleteMachineryPhoto, fetchUploadMachineryPhoto} from "../model/actions";
import {IMachinery} from "../../../models/iMachinery";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getMachineryIsLoading} from "../model/selectors";
import Photos from "../../../components/common/Photos";
import {filesPath} from "../../../api/files";

interface IProps {
    machinery: IMachinery;
}

const MachineryDetailsPhotos: FC<IProps> = ({machinery}) => {
    const isLoading = useAppSelector(getMachineryIsLoading);
    const dispatch = useAppDispatch();
    const photoUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            dispatch(fetchUploadMachineryPhoto({
                machinery: machinery,
                formData: formData,
            }));
        }
    };
    const onDeletePhoto = (index: number) => {
        dispatch(fetchDeleteMachineryPhoto({
            machinery: machinery,
            deletePhoto: machinery.photos[index],
        }));
    };
    const photoPaths = machinery.photos.map(photo => `${filesPath}/${photo}`);
    return (
       <Photos photoPaths={photoPaths}
               isLoading={isLoading}
               photoUploadHandler={photoUploadHandler}
               onDeletePhoto={onDeletePhoto}/>
    );
};

export default MachineryDetailsPhotos;