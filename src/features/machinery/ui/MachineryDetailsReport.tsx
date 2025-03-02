import React, {FC, useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";
import MachineryView from "./MachineryView";
import Box from "@mui/material/Box";
import MachineryDetailsPhotos from "./MachineryDetailsPhotos";
import {ICurrentMachinery, MachineryStatusType} from "../../../models/iMachinery";
import {useEditor} from "../../../hooks/useEditor";
import {machineryValidate} from "../../../utils/validators";
import {fetchUpdateMachinery} from "../model/actions";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import {getCurrentMachinery, getMachineryIsLoading} from "../model/selectors";
import {MachineryStatus} from "../../../utils/const";
import {defaultMachinery} from "../utils/const";
import ProblemReportItem from "./problems/ProblemReportItem";

const MachineryDetailsReport: FC = () => {
    const dispatch = useAppDispatch();
    const machinery = useAppSelector(getCurrentMachinery);
    const isLoading = useAppSelector(getMachineryIsLoading);
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
    const lastProblemList = machinery.problems.slice(0,3).map(problem => (<ProblemReportItem key={problem.id}
                                                                                             problem={problem} />));
    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(500px, 100%), 1fr))",
                gap: "16px",
            }}
        >
            <MachineryView editedMachinery={editedValue}
                           isEditMode={isEditMode}
                           errors={errors}
                           machineryFieldChangeHandler={handleFieldChange}/>
            <Card sx={{padding: "24px"}}>
                <Typography variant="h5" color="primary">Последние проблемы:</Typography>
                <Stack  sx={{marginTop: "12px"}}>
                    {lastProblemList}
                </Stack>
            </Card>
            <Box sx={{flexGrow: 1}}>
                <MachineryDetailsPhotos machinery={machinery} isEditMode={isEditMode}/>
            </Box>
            <Box></Box>
            <Stack direction="row" sx={{width: "100%"}} alignItems="center" justifyContent="end" spacing={2}>
                {isEditMode
                    ? (<>
                        <Button onClick={cancelUpdateMachineryHandler}
                                variant={"outlined"} >
                            Отменить
                        </Button>
                        <LoadingButton onClick={updateMachineryHandler}
                                       variant={"contained"}
                                       loading={isLoading}
                                       disabled={!!Object.keys(errors).length}
                                       color={"success"}>
                            Сохранить
                        </LoadingButton>
                    </>)
                    : (<>
                        <Button variant="contained"
                                color={machinery && machinery.status && machinery.status === MachineryStatus.disActive
                                    ? "success"
                                    : "error"}
                                disabled={isLoading}
                                onClick={changeMachineryStatusHandler}
                                sx={{width: "150px"}}>
                            {machinery && machinery.status && machinery.status === MachineryStatus.disActive
                                ? "Востановить"
                                : "Списать"
                            }
                        </Button>
                        <LoadingButton onClick={toggleIsEditMode}
                                       variant={"contained"}
                                       loading={isLoading}
                                       color="primary">
                            Редактировать
                        </LoadingButton>
                    </>)}
            </Stack>
        </Box>
    );
};

export default MachineryDetailsReport;