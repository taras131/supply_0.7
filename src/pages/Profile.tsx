import React, {useEffect} from "react";
import Preloader from "../components/Preloader";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getIsAuth, getIsAuthLoading, getUser} from "../store/selectors/auth";
import {deepPurple} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {fetchOut} from "../store/actionsCreators/auth";
import {Grid, Container} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => getUser(state));
    const isAuth = useAppSelector(state => getIsAuth(state));
    const isAuthLoading = useAppSelector(state => getIsAuthLoading(state));
    useEffect(() => {
        if (!isAuth) navigate(routes.login);
    }, [isAuth]);
    const handleOutClick = () => {
        dispatch(fetchOut());
    };
    if (isAuthLoading) return (<Preloader/>);
    return (
        <Container component="div" maxWidth="xs" style={{marginTop: "150px"}}>
            <CssBaseline/>
            <Stack spacing={4} justifyContent="center" alignItems="center">
                <Typography variant="h3" component="h2" fontWeight={700}>
                    Профиль
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="center" style={{maxWidth: "600px"}}>
                    <Grid item>
                        <Avatar sx={{bgcolor: deepPurple[500]}}>{user.email.substring(0, 2)}</Avatar>
                    </Grid>
                    <Grid item>
                        <Stack spacing={3} direction="row" alignItems="center">
                            <Typography component="span" fontWeight={600}>Имя:</Typography>
                            <p>{user.firstName}</p>
                        </Stack>
                        <Stack spacing={3} direction="row" alignItems="center">
                            <Typography component="span" fontWeight={600}>Отчество:</Typography>
                            <p>{user.middleName}</p>
                        </Stack>
                        <Stack spacing={3} direction="row" alignItems="center">
                            <Typography component="span" fontWeight={600}>Должность:</Typography>
                            <p>{user.role}</p>
                        </Stack>
                        <Stack spacing={3} direction="row" alignItems="center">
                            <Typography component="span" fontWeight={600}>id:</Typography>
                            <p>{user.id}</p>
                        </Stack>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Typography component="span" fontWeight={600}>
                                email:
                            </Typography>
                            <p>{user.email}</p>
                        </Stack>
                    </Grid>
                </Grid>
                <Button onClick={handleOutClick} color="secondary" variant="outlined" style={{width: "220px"}}>
                    Выход
                </Button>
            </Stack>
        </Container>
    );
};

export default Profile;