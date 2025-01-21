import React, {FC} from "react";
import {CENTER, ROW, SPACE_BETWEEN} from "../../../styles/const";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {Typography, useMediaQuery} from "@mui/material";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/redux";
import {getMachineryIsLoading} from "../model/selectors";
import LoadingButton from "@mui/lab/LoadingButton";

interface IProps {
    title: string
    isEditMode: boolean
    cancelUpdateMachineryHandler: () => void
    updateMachineryHandler: () => void
    toggleIsEditMode: () => void
}

const MachineryDetailsHeader: FC<IProps> = ({
                                                title,
                                                isEditMode,
                                                cancelUpdateMachineryHandler,
                                                updateMachineryHandler,
                                                toggleIsEditMode,
                                            }) => {
    const matches_700 = useMediaQuery("(min-width:700px)");
    const navigate = useNavigate();
    const isLoading = useAppSelector(getMachineryIsLoading);
    const handleBackClick = () => {
        navigate(routes.machinery);
    };
    return (
        <Grid container sx={{width: "100%"}} direction={ROW} alignItems={CENTER} justifyContent={SPACE_BETWEEN}
              spacing={1}>
            <Grid xs={3}>
                {isEditMode
                    ? (<Button onClick={cancelUpdateMachineryHandler} variant={"contained"} color="error">
                        Отменить
                    </Button>)
                    : (<Button onClick={handleBackClick} variant={"outlined"}>
                        Назад
                    </Button>)}
            </Grid>
            <Grid xs={6} textAlign={CENTER}>
                <Typography variant="h2" fontSize={matches_700 ? "24px" : "16px"}
                            fontWeight={matches_700 ? 700 : 600}>
                    {title}
                </Typography>
            </Grid>
            <Grid xs={3} sx={{textAlign: "right"}}>
                <LoadingButton onClick={isEditMode ? updateMachineryHandler : toggleIsEditMode}
                               variant={"contained"}
                               loading={isLoading}
                               color={isEditMode ? "success" : "primary"}>
                    {isEditMode ? "Сохранить" : "Редактировать"}
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default MachineryDetailsHeader;