import React, {ChangeEvent, useEffect, useState} from "react";
import {SelectChangeEvent, Stack, Typography} from "@mui/material";
import PhotosManager from "../../../components/common/PhotosManager";
import MachineryView from "./MachineryView";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../hooks/redux";
import {MachineryStatus} from "../../../utils/const";
import {INewMachinery} from "../../../models/iMachinery";
import usePhotoManager from "../../../hooks/usePhotoManager";
import {fetchAddMachinery} from "../model/actions";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";

const emptyMachinery = {
    brand: "",
    model: "",
    year_manufacture: -1,
    type_id: -1,
    engine_type_id: -1,
    vin: "",
    state_number: "",
    status: MachineryStatus.active,
    photos: [],
    traction_type_id: -1,
    transmission_type_id: -1,
    working_equipment: "",
    engine_brand: "",
    engine_model: "",
    transmission_brand: "",
    transmission_model: "",
};

const MachineryAddNewPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [editedMachinery, setEditedMachinery] = useState<INewMachinery>(emptyMachinery);
    const {tempFiles, onAddPhoto, onDeletePhoto, clearPhotos} = usePhotoManager();
    useEffect(() => {
        return () => {
            clearPhotos();
        };
    }, []);
    const machineryFieldChangeHandler = (e: ChangeEvent<HTMLInputElement
            | HTMLTextAreaElement>
        | SelectChangeEvent<string | unknown>) => {
        setEditedMachinery(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleAddClick = async () => {
        dispatch(fetchAddMachinery({
            newMachinery: editedMachinery,
            files: tempFiles.map(fileData => fileData.file),
        }));
        clearPhotos();
        setEditedMachinery(emptyMachinery);
        navigate(routes.machinery);
    };
    return (
        <Stack sx={{padding: "24px", height: "100%"}} spacing={4}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button variant="outlined"
                        component={Link}
                        to={routes.machinery}>
                    Назад
                </Button>
                <Typography variant="h2" fontSize={"24px"} textAlign="center">
                    Новая Техника:
                </Typography>
                <Button onClick={handleAddClick}
                        variant={"contained"}
                        color={"success"}>
                    Сохранить
                </Button>
            </Stack>
            <MachineryView editedMachinery={editedMachinery}
                           machineryFieldChangeHandler={machineryFieldChangeHandler}
                           isEditMode={true}/>
            <PhotosManager onAddPhoto={onAddPhoto}
                           onDeletePhoto={onDeletePhoto}
                           photosPaths={tempFiles.map(fileData => fileData.preview)}/>
        </Stack>
    );
};

export default MachineryAddNewPage;