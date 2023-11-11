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
import {useEffect, useId, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchLogin, fetchRegister} from "../store/actionsCreators/auth";
import {getAuthErrorMessage, getIsAuth, getIsAuthLoading} from "../store/selectors/auth";
import MessageWindow from "../components/MessageWindow";
import {validateEmail} from "../utils/services";
import {setMessage} from "../store/reducers/message";
import {MESSAGE_SEVERITY} from "../utils/const";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";


const Auth = () => {
    const location: any = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector(state => getIsAuth(state));
    const isLoading = useAppSelector(state => getIsAuthLoading(state));
    const selectLabelId = useId();
    const selectId = useId();
    const selectUserRoleId = useId();
    const errorMessage = useAppSelector(state => getAuthErrorMessage(state));
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        firstName: "",
        middleName: "",
    });
    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: "",
        firstName: "",
        middleName: "",
    });
    const [textErrors, setTextErrors] = useState({
        email: "",
        password: "",
        firstName: "",
        middleName: "",
    });
    const [selectedUserRole, setSelectedUserRole] = useState("");
    const handleUserRoleChange = (e: SelectChangeEvent) => {
        setSelectedUserRole(e.target.value as string);
    };
    const {pathname} = useLocation();
    const isRegister = pathname === routes.register;
    const [isOpenErrorMessageWindow, setIsOpenErrorMessageWindow] = useState(false);
    const toggleIsOpenErrorMessageWindow = () => {
        setIsOpenErrorMessageWindow(prev => !prev);
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
            dispatch(setMessage({
                severity: MESSAGE_SEVERITY.success,
                text: "Вы успешно вошли в систему.",
            }));
        }
    }, [isAuth]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setValidationErrors({...validationErrors, email: ""});
            setTextErrors({...textErrors, email: ""});
            if (!validateEmail(e.target.value)) {
                setValidationErrors({...validationErrors, email: "Введён не email"});
            }
        } else {
            setValidationErrors({...validationErrors, password: ""});
            setTextErrors({...textErrors, password: ""});
            if (e.target.value.length < 6) {
                setValidationErrors({...validationErrors, password: "Пароль должен быть не менее 6 символов"});
            }
        }
        setInputValues({...inputValues, [e.target.name]: e.target.value});
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isRegister) {
            dispatch(fetchRegister({
                firstName: inputValues.firstName,
                middleName: inputValues.middleName,
                password: inputValues.password,
                email: inputValues.email,
                role: selectedUserRole,
            }));
        } else {
            dispatch(fetchLogin(inputValues));
        }
    };
    useEffect(() => {
        const validationTimeout = setTimeout(() => {
            if (validationErrors.email) {
                setTextErrors({...textErrors, email: validationErrors.email});
            }
            if (validationErrors.password) {
                setTextErrors({...textErrors, password: validationErrors.password});
            }
        }, 1300);

        return () => clearTimeout(validationTimeout);
    }, [validationErrors.email, validationErrors.password, inputValues.email, inputValues.password]);
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
                    {isRegister
                        ? "Регистрация"
                        : "Вход"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        onChange={handleInputChange}
                        value={inputValues.email}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={!!textErrors.email}
                        helperText={textErrors.email}
                    />
                    <TextField
                        onChange={handleInputChange}
                        value={inputValues.password}
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!textErrors.password}
                        helperText={textErrors.password}
                    />
                    {isRegister && (
                        <>
                            <TextField
                                onChange={handleInputChange}
                                value={inputValues.firstName}
                                margin="normal"
                                fullWidth
                                name="firstName"
                                label="Имя"
                                type="text"
                                id="firstName"
                                autoComplete="firstName"
                                error={!!textErrors.firstName}
                                helperText={textErrors.firstName}
                            />
                            <TextField
                                onChange={handleInputChange}
                                value={inputValues.middleName}
                                margin="normal"
                                fullWidth
                                name="middleName"
                                label="Отчество"
                                type="text"
                                id="middleName"
                                autoComplete="middleName"
                                error={!!textErrors.middleName}
                                helperText={textErrors.middleName}
                            />
                            <FormControl fullWidth sx={{width: "100%", marginTop: "16px"}}>
                                <InputLabel id={selectLabelId}>Роль</InputLabel>
                                <Select
                                    id={selectId}
                                    name={selectUserRoleId}
                                    labelId={selectLabelId}
                                    defaultValue={""}
                                    value={selectedUserRole}
                                    label={selectLabelId}
                                    onChange={handleUserRoleChange}
                                    sx={{overflow: "hidden"}}
                                >
                                    <MenuItem key={1} value={"Директор"}>
                                        Директор
                                    </MenuItem>
                                    <MenuItem key={2} value={"Снабженец"}>
                                        Снабженец
                                    </MenuItem>
                                    <MenuItem key={3} value={"Бухгалтер"}>
                                        Бухгалтер
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}
                    <LoadingButton
                        loading={isLoading}
                        loadingIndicator="Загрузка…"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={!!validationErrors.email
                            || !!validationErrors.password
                            || inputValues.password.length === 0
                            || inputValues.email.length === 0}
                    >
                        {isRegister
                            ? "Регистрация"
                            : "Войти"}
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            {isRegister
                                ? (<Link to={routes.login}>
                                    {"Есть аккаунт? Войти"}
                                </Link>)
                                : (<Link to={routes.register}>
                                    {"Нет аккаунта? Зарегистрироваться"}
                                </Link>)}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <MessageWindow isOpenModal={isOpenErrorMessageWindow}
                           handleToggleOpen={toggleIsOpenErrorMessageWindow}
                           message={errorMessage}/>
        </Container>
    );
};

export default Auth;