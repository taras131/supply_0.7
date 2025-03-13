import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchLogin, fetchRegister} from "../model/actions";
import {getAuthErrorMessage, getIsAuth, getIsAuthLoading} from "../model/selectors";
import MessageWindow from "../../../components/MessageWindow";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY} from "../../../utils/const";
import {userRoles} from "../../users/model/slice";
import {useEditor} from "../../../hooks/useEditor";
import {registerValidate} from "../../../utils/validators";
import {emptyUser} from "../utils/const";
import {IRegisterData} from "../../../models/iAuth";
import FieldControl from "../../../components/common/FieldControl";
import {Stack} from "@mui/material";
import Card from "@mui/material/Card";

const Auth = () => {
    const location: any = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useAppSelector(getIsAuth);
    const isLoading = useAppSelector(getIsAuthLoading);
    const errorMessage = useAppSelector(getAuthErrorMessage);
    const {pathname} = useLocation();
    const isRegister = pathname === routes.register;
    const {
        editedValue,
        errors,
        handleFieldChange,
        resetValue,
    } = useEditor<IRegisterData>({
        initialValue: emptyUser,
        validate: registerValidate,
    });
    const [isOpenErrorMessageWindow, setIsOpenErrorMessageWindow] = useState(false);
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
            dispatch(fetchRegister(editedValue),);
        } else {
            dispatch(fetchLogin({email: editedValue.email, password: editedValue.password}));
        }
        resetValue();
    };
    console.log(errors);
    return (
        <Container component="div" maxWidth="xs">
            <Stack justifyContent="center" alignItems="center" sx={{minHeight: "80vh"}}>
                <Card sx={{padding: "24px"}}>
                    <Stack spacing={1} alignItems="center" justifyContent="center">
                        <Avatar sx={{m: 1, backgroundColor: "secondary.main"}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {isRegister ? "Регистрация" : "Вход"}
                        </Typography>
                        <Box component="form"
                             onSubmit={handleSubmit}
                             sx={{width: "300px",
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 flexDirection: "column",
                                 gap: "10px"}}>
                            <FieldControl
                                label="Email"
                                name="email"
                                id="email"
                                value={editedValue.email}
                                error={errors?.email}
                                isEditMode={true}
                                onChange={handleFieldChange}
                                isRequired
                            />
                            <FieldControl
                                label="Пароль"
                                name="password"
                                id="password"
                                value={editedValue.password}
                                error={errors?.password}
                                isEditMode={true}
                                onChange={handleFieldChange}
                                isRequired
                            />
                            {isRegister && (
                                <>
                                    <FieldControl
                                        label="Имя"
                                        name="first_name"
                                        id="first_name"
                                        value={editedValue.first_name}
                                        error={errors?.first_name}
                                        isEditMode={true}
                                        onChange={handleFieldChange}
                                        isRequired
                                    />
                                    <FieldControl
                                        label="Отчество"
                                        name="middle_name"
                                        id="middle_name"
                                        value={editedValue.middle_name}
                                        error={errors?.middle_name}
                                        isEditMode={true}
                                        onChange={handleFieldChange}
                                        isRequired
                                    />
                                    <FieldControl
                                        label="Основание"
                                        name="role_id"
                                        id="role_id"
                                        value={editedValue.role_id}
                                        error={errors?.role_id}
                                        isEditMode={true}
                                        onChange={handleFieldChange}
                                        options={userRoles}
                                        isRequired
                                    />
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
                    </Stack>
                </Card>
            </Stack>

            <MessageWindow
                isOpenModal={isOpenErrorMessageWindow}
                handleToggleOpen={toggleIsOpenErrorMessageWindow}
                message={errorMessage}
            />
        </Container>
    );
};

export default Auth;
