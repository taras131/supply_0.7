import React, {useCallback, ChangeEvent} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";
import {
    SelectChangeEvent, Stack, Typography,
} from "@mui/material";
import {fetchAddMachinery} from "../model/actions";
import {useAppDispatch} from "../../../hooks/redux";
import {MachineryStatus} from "utils/const";
import MachineryEdit from "./MachineryEdit";
import Button from "@mui/material/Button";

const MachineryAddNew = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [editedMachinery, setEditedMachinery] = React.useState({
        brand: "",
        model: "",
        year_manufacture: 2010,
        type_id: 0,
        vin: "",
        state_number: "",
        status: MachineryStatus.active,
    });
    const machineryFieldChangeHandler = (e: ChangeEvent<HTMLInputElement
            | HTMLTextAreaElement>
        | SelectChangeEvent) => {
        setEditedMachinery(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleBackClick = useCallback(() => {
        navigate(location.state && location.state.from ? location.state.from : routes.machinery);
    }, [navigate, location.state]);
    const handleAddClick = () => {
        dispatch(
            fetchAddMachinery(editedMachinery)
        );
        navigate(routes.machinery);
    };
    return (
        <Stack sx={{padding: "24px", width: "500px"}} spacing={3}>
            <Typography variant="h2" fontSize={"24px"} textAlign="center">
                Новая Техника:
            </Typography>
            <MachineryEdit editedMachinery={editedMachinery}
                           machineryFieldChangeHandler={machineryFieldChangeHandler}/>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button onClick={handleBackClick} variant={"outlined"}>
                    Назад
                </Button>
                <Button onClick={handleAddClick} variant={"contained"} color={"success"}
                        sx={{marginLeft: "10px"}}>
                    Сохранить
                </Button>
            </Stack>
        </Stack>
    );
};

export default MachineryAddNew;
