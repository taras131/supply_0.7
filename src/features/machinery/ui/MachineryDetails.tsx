import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCurrentMachinery} from "../model/selectors";
import {useParams} from "react-router-dom";
import {SelectChangeEvent, Stack} from "@mui/material";
import {
     fetchGetMachineryById,
    fetchUpdateMachinery,
} from "../model/actions";
import MessageWindow from "../../../components/MessageWindow";
import {ICurrentMachinery} from "models/iMachinery";
import Grid from "@mui/material/Unstable_Grid2";
import MachineryDetailsPhotos from "./MachineryDetailsPhotos";
import MachineryDetailsInfo from "./MachineryDetailsInfo";
import MachineryDetailsHeader from "./MachineryDetailsHeader";
import Preloader from "../../../components/Preloader";
import MachineryDetailsTabs from "./MachineryDetailsTabs";

const errorDeleteNoticeMessage = "Авторизируйтесь для удаления заметки.";

const MachineryDetails = () => {
    const dispatch = useAppDispatch();
    const machineryId = useParams().machineryId || "0";
    const machinery = useAppSelector(getCurrentMachinery);
    const [isOpenErrorMessageWindow, setIsOpenErrorMessageWindow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedMachinery, setEditedMachinery] = useState<ICurrentMachinery | null>(null);
    useEffect(() => {
        dispatch(fetchGetMachineryById(+machineryId));
    }, [dispatch, machineryId]);
    useEffect(() => {
        if (machinery) {
            setEditedMachinery(machinery);
        }
    }, [machinery]);
    if (!machinery) {
        return <Preloader />;
    }
    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };
    const toggleIsOpenErrorMessageWindow = () => {
        setIsOpenErrorMessageWindow((prev) => !prev);
    };

    const machineryFieldChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        setEditedMachinery(prev => prev ? {...prev, [e.target.name]: e.target.value} : null);
    };

    const updateMachineryHandler = () => {
        if (editedMachinery) {
            toggleIsEditMode();
            dispatch(fetchUpdateMachinery(editedMachinery));
        }
    };

    const cancelUpdateMachineryHandler = () => {
        toggleIsEditMode();
        setEditedMachinery(machinery);
    };
    return (
        <Stack sx={{maxWidth: "1350px", width: "100%", marginLeft: "auto", marginRight: "auto"}} spacing={3}>
            <MachineryDetailsHeader isEditMode={isEditMode}
                                    toggleIsEditMode={toggleIsEditMode}
                                    title={`${machinery.brand} ${machinery.model}`}
                                    cancelUpdateMachineryHandler={cancelUpdateMachineryHandler}
                                    updateMachineryHandler={updateMachineryHandler}/>
            <Grid container spacing={4}>
                <Grid xs={6} sx={{display: "flex", flexDirection: "column"}}>
                    <MachineryDetailsPhotos machinery={machinery} isEditMode={isEditMode}/>
                </Grid>
                <Grid xs={6} sx={{height: "100%"}}>
                    <MachineryDetailsInfo editedMachinery={editedMachinery}
                                          isEditMode={isEditMode}
                                          machineryFieldChangeHandler={machineryFieldChangeHandler}/>
                </Grid>
            </Grid>
           <MachineryDetailsTabs/>
            <MessageWindow
                isOpenModal={isOpenErrorMessageWindow}
                handleToggleOpen={toggleIsOpenErrorMessageWindow}
                message={errorDeleteNoticeMessage}
            />
        </Stack>
    );
};

export default MachineryDetails;
