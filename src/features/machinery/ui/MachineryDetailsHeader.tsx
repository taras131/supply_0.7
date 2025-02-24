import React, {FC} from "react";
import {CENTER, ROW, SPACE_BETWEEN} from "../../../styles/const";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {Typography, useMediaQuery} from "@mui/material";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/redux";
import {getCurrentMachineryTitle} from "../model/selectors";

const MachineryDetailsHeader: FC= () => {
    const matches_700 = useMediaQuery("(min-width:700px)");
    const navigate = useNavigate();
    const title = useAppSelector(getCurrentMachineryTitle);
    const handleBackClick = () => {
        navigate(routes.machinery);
    };
    return (
        <Grid container sx={{width: "100%"}} direction={ROW} alignItems={CENTER} justifyContent={SPACE_BETWEEN}
              spacing={1}>
            <Grid xs={4}>
                <Button onClick={handleBackClick} variant={"outlined"}>
                    Назад
                </Button>
            </Grid>
            <Grid xs={8} textAlign={CENTER}>
                <Typography variant="h2" fontSize={matches_700 ? "24px" : "16px"}
                            fontWeight={matches_700 ? 700 : 600}>
                    {title}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default MachineryDetailsHeader;