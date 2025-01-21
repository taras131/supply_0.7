import React, {useCallback, ChangeEvent} from "react";
import PageLayout from "../../../components/PageLayout";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";
import {
    SelectChangeEvent, Stack, Typography,
} from "@mui/material";
import {fetchAddMachinery} from "../model/actions";
import {useAppDispatch} from "../../../hooks/redux";
import {MachineryStatus} from "utils/const";
import MachineryEdit from "./MachineryEdit";
import Grid from "@mui/material/Unstable_Grid2";
import {CENTER, ROW, SPACE_BETWEEN} from "../../../styles/const";
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
        <PageLayout>
            <Grid container sx={{width: "100%"}}
                  direction={ROW}
                  alignItems={CENTER}
                  justifyContent={SPACE_BETWEEN}
                  spacing={1}>
                <Grid xs={3}>
                    <Button onClick={handleBackClick} variant={"outlined"}>
                        Назад
                    </Button>
                </Grid>
                <Grid xs={6} textAlign={CENTER}>
                    <Typography variant="h2" fontSize={"24px"}>
                        Новая Техника:
                    </Typography>
                </Grid>
                <Grid xs={3} sx={{textAlign: "right"}}>
                    <Button onClick={handleAddClick} variant={"contained"} color={"success"}
                            sx={{marginLeft: "10px"}}>
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
            <Stack spacing={3} pt={15} sx={{maxWidth: "600px",width: "100%"}}>
                <MachineryEdit editedMachinery={editedMachinery}
                               machineryFieldChangeHandler={machineryFieldChangeHandler}/>
            </Stack>
        </PageLayout>
    );
};

export default MachineryAddNew;
