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
import { useEffect, useId, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../utils/routes";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchLogin, fetchRegister } from "../store/actionsCreators/auth";
import { getAuthErrorMessage, getIsAuth, getIsAuthLoading } from "../store/selectors/auth";
import MessageWindow from "../components/MessageWindow";
import { setMessage } from "../store/reducers/message";
import { MESSAGE_SEVERITY, userRoles } from "../utils/const";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useInput } from "../hooks/useInput";

const Auth = () => {
  const location: any = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectLabelId = useId();
  const selectUserRoleId = useId();
  const isAuth = useAppSelector((state) => getIsAuth(state));
  const isLoading = useAppSelector((state) => getIsAuthLoading(state));
  const errorMessage = useAppSelector((state) => getAuthErrorMessage(state));
  const { pathname } = useLocation();
  const isRegister = pathname === routes.register;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isOpenErrorMessageWindow, setIsOpenErrorMessageWindow] = useState(false);
  const email = useInput("", { isEmpty: true, minLength: 4, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 6 });
  const firstName = useInput("", { isEmpty: true, minLength: 2 });
  const middleName = useInput("", { isEmpty: true, minLength: 4 });
  const role = useInput("", { isEmpty: true });
  useEffect(() => {
    if (isRegister) {
      if (email.isValid && password.isValid && firstName.isValid && middleName.isValid && role.isValid) {
        setIsSubmitDisabled(false);
      } else {
        setIsSubmitDisabled(true);
      }
    } else {
      if (email.isValid && password.isValid) {
        setIsSubmitDisabled(false);
      } else {
        setIsSubmitDisabled(true);
      }
    }
  }, [email.isValid, password.isValid, firstName.isValid, middleName.isValid, role.isValid, isRegister]);
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
          firstName: firstName.value,
          middleName: middleName.value,
          password: password.value,
          email: email.value,
          role: role.value,
        }),
      );
    } else {
      dispatch(fetchLogin({ email: email.value, password: password.value }));
    }
  };
  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? "Регистрация" : "Вход"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "300px" }}>
          <div style={{ height: 95 }}>
            <TextField
              onChange={email.onChange}
              value={email.value}
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              error={!!email.error}
              type={"email"}
            />
            {email.error && (
              <Typography fontSize={12} color="error">
                {email.error}
              </Typography>
            )}
          </div>
          <div style={{ height: 95 }}>
            <TextField
              onChange={password.onChange}
              value={password.value}
              margin="normal"
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!password.error}
            />
            {password.error && (
              <Typography fontSize={12} color="error">
                {password.error}
              </Typography>
            )}
          </div>
          {isRegister && (
            <>
              <div style={{ height: 95 }}>
                <TextField
                  onChange={firstName.onChange}
                  value={firstName.value}
                  margin="normal"
                  fullWidth
                  name="firstName"
                  label="Имя"
                  type="text"
                  id="firstName"
                  autoComplete="firstName"
                  error={!!firstName.error}
                />
                {firstName.error && (
                  <Typography fontSize={12} color="error">
                    {firstName.error}
                  </Typography>
                )}
              </div>
              <div style={{ height: 95 }}>
                <TextField
                  onChange={middleName.onChange}
                  value={middleName.value}
                  margin="normal"
                  fullWidth
                  name="middleName"
                  label="Отчество"
                  type="text"
                  id="middleName"
                  autoComplete="middleName"
                  error={!!middleName.error}
                />
                {middleName.error && (
                  <Typography fontSize={12} color="error">
                    {middleName.error}
                  </Typography>
                )}
              </div>
              <div style={{ height: 95 }}>
                <FormControl fullWidth sx={{ width: "100%", marginTop: "16px" }}>
                  <InputLabel id={selectLabelId}>Роль</InputLabel>
                  <Select
                    id={selectUserRoleId}
                    name={"role"}
                    labelId={selectLabelId}
                    defaultValue={""}
                    value={role.value}
                    label={selectLabelId}
                    onChange={role.onChange}
                    sx={{ overflow: "hidden" }}
                    error={!!role.error}
                  >
                    <MenuItem key={2} value={userRoles.supplier}>
                      {userRoles.supplier}
                    </MenuItem>
                    <MenuItem key={3} value={userRoles.accountant}>
                      {userRoles.accountant}
                    </MenuItem>
                  </Select>
                </FormControl>
                {role.error && (
                  <Typography fontSize={12} color="error">
                    {role.error}
                  </Typography>
                )}
              </div>
            </>
          )}
          <LoadingButton
            loading={isLoading}
            loadingIndicator="Загрузка…"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitDisabled}
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
