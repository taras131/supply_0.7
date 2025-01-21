import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchLogin, fetchRegister} from "../model/actions";
import {getAuthErrorMessage, getIsAuth, getIsAuthLoading} from "../model/selectors";
import MessageWindow from "../../../components/MessageWindow";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {userRoles} from "../../users/model/slice";

const Auth = () => {
    const location: any = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => getIsAuth(state));
    const isLoading = useAppSelector((state) => getIsAuthLoading(state));
    const errorMessage = useAppSelector((state) => getAuthErrorMessage(state));
    const {pathname} = useLocation();
    const isRegister = pathname === routes.register;
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isOpenErrorMessageWindow, setIsOpenErrorMessageWindow] = useState(false);
    const [inputData, setInputData] = useState({
        email: "",
        first_name: "",
        middle_name: "",
        role_id: 2,
        password: "",
    });
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent) => {
        setInputData(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    useEffect(() => {
        if (errorMessage) {
            setIsOpenErrorMessageWindow(true);
        }
    }, [errorMessage]);
    useEffect(() => {
        if (isAuth) {
            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                navigate(routes.profile);
            }
            dispatch(
                setMessage({
                    severity: MESSAGE_SEVERITY.success,
                    text: "Вы успешно вошли в систему.",
                }),
            );
        }
    }, [isAuth]);
    const toggleIsOpenErrorMessageWindow = () => {
        setIsOpenErrorMessageWindow((prev) => !prev);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isRegister) {
            dispatch(
                fetchRegister({
                    first_name: inputData.first_name,
                    middle_name: inputData.middle_name,
                    password: inputData.password,
                    email: inputData.email,
                    role_id: +inputData.role_id,
                }),
            );
        } else {
            dispatch(fetchLogin({email: inputData.email, password: inputData.password}));
        }
    };
    const roleList = useMemo(
        () =>
            userRoles.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                    {type.title}
                </MenuItem>
            )),
        []
    );
    return (
        <Container component="div" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isRegister ? "Регистрация" : "Вход"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1, width: "300px"}}>
                    <div style={{height: 95}}>
                        <TextField
                            onChange={inputChangeHandler}
                            value={inputData.email}
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            error={!inputData.email}
                            type={"email"}
                        />
                    </div>
                    <div style={{height: 95}}>
                        <TextField
                            onChange={inputChangeHandler}
                            value={inputData.password}
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!inputData.password}
                        />
                    </div>
                    {isRegister && (
                        <>
                            <div style={{height: 95}}>
                                <TextField
                                    onChange={inputChangeHandler}
                                    value={inputData.first_name}
                                    margin="normal"
                                    fullWidth
                                    name="first_name"
                                    label="Имя"
                                    type="text"
                                    id="firstName"
                                    autoComplete="firstName"
                                    error={!inputData.first_name}
                                />
                            </div>
                            <div style={{height: 95}}>
                                <TextField
                                    onChange={inputChangeHandler}
                                    value={inputData.middle_name}
                                    margin="normal"
                                    fullWidth
                                    name="middle_name"
                                    label="Отчество"
                                    type="text"
                                    id="middleName"
                                    autoComplete="middleName"
                                    error={!inputData.middle_name}
                                />
                            </div>
                            <div style={{height: 95}}>
                                <FormControl fullWidth>
                                    <Select
                                        id={"select_role"}
                                        value={`${inputData.role_id}`}
                                        onChange={inputChangeHandler}
                                        sx={{overflow: "hidden"}}
                                        fullWidth
                                        name={"role_id"}
                                    >
                                        {roleList}
                                    </Select>
                                </FormControl>
                            </div>
                        </>
                    )}
                    <LoadingButton
                        loading={isLoading}
                        loadingIndicator="Загрузка…"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}

                    >
                        {isRegister ? "Регистрация" : "Войти"}
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            {isRegister ? (
                                <Link to={routes.login}>{"Есть аккаунт? Войти"}</Link>
                            ) : (
                                <Link to={routes.register}>{"Нет аккаунта? Зарегистрироваться"}</Link>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <MessageWindow
                isOpenModal={isOpenErrorMessageWindow}
                handleToggleOpen={toggleIsOpenErrorMessageWindow}
                message={errorMessage}
            />
        </Container>
    );
};

export default Auth;
