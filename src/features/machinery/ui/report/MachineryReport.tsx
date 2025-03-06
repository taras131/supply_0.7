import React, {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import MachineryDetailsPhotos from "../MachineryDetailsPhotos";
import {ICurrentMachinery, MachineryStatusType} from "../../../../models/iMachinery";
import {useEditor} from "../../../../hooks/useEditor";
import {machineryValidate} from "../../../../utils/validators";
import {fetchUpdateMachinery} from "../../model/actions";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {
    getCurrentMachinery,
} from "../../model/selectors";
import {MachineryStatus} from "../../../../utils/const";
import {defaultMachinery} from "../../utils/const";
import MachineryBasicView from "../MachineryBasicView";
import MachineryAdditionalView from "../MachineryAdditionalView";
import MachineryReportSummary from "./MachineryReportSummary";
import MachineryReportActionButtons from "./MachineryReportActionButtons";

const MachineryReport: FC = () => {
    const dispatch = useAppDispatch();
    const machinery = useAppSelector(getCurrentMachinery);
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        if (machinery) {
            setEditedValue(machinery);
        }
    }, [machinery]);
    const {
        editedValue,
        errors,
        setEditedValue,
        handleFieldChange,
    } = useEditor<ICurrentMachinery>({
        initialValue: machinery ?? defaultMachinery,
        validate: machineryValidate,
    });
    if (!machinery) return null;
    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };
    const updateMachineryHandler = () => {
        if (editedValue) {
            toggleIsEditMode();
            dispatch(fetchUpdateMachinery(editedValue));
        }
    };
    const cancelUpdateMachineryHandler = () => {
        toggleIsEditMode();
        setEditedValue(machinery);
    };
    const changeMachineryStatusHandler = () => {
        let newStatus: MachineryStatusType = MachineryStatus.disActive;
        if (machinery?.status && machinery.status === MachineryStatus.disActive) {
            newStatus = MachineryStatus.active;
        }
        dispatch(fetchUpdateMachinery({...machinery, status: newStatus}));
    };
    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(500px, 100%), 1fr))",
                gap: "16px",
            }}
        >
            <MachineryBasicView editedMachinery={editedValue}
                                isEditMode={isEditMode}
                                errors={errors}
                                machineryFieldChangeHandler={handleFieldChange}/>
            <MachineryAdditionalView editedMachinery={editedValue}
                                     isEditMode={isEditMode}
                                     errors={errors}
                                     machineryFieldChangeHandler={handleFieldChange}/>
            <MachineryReportSummary/>
            <MachineryDetailsPhotos machinery={machinery}
                                    isEditMode={isEditMode}/>
            <Box></Box>
            <MachineryReportActionButtons machinery={machinery}
                                          isEditMode={isEditMode}
                                          isValid={!!Object.keys(errors).length}
                                          toggleIsEditMode={toggleIsEditMode}
                                          updateMachineryHandler={updateMachineryHandler}
                                          cancelUpdateMachineryHandler={cancelUpdateMachineryHandler}
                                          changeMachineryStatusHandler={changeMachineryStatusHandler}
            />
        </Box>
    );
};

export default MachineryReport;