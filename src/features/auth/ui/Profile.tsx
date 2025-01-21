import React, { useEffect } from "react";
import Preloader from "../../../components/Preloader";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getIsAuth, getIsAuthLoading, getUser } from "../model/selectors";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../utils/routes";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { fetchOut } from "../model/actions";
import { Container } from "@mui/material";
import TitleWithValue from "../../../components/TitleWithValue";
import Grid from "@mui/material/Unstable_Grid2";
import { CENTER, START } from "../../../styles/const";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => getUser(state));
  const isAuth = useAppSelector((state) => getIsAuth(state));
  const isAuthLoading = useAppSelector((state) => getIsAuthLoading(state));
  useEffect(() => {
    if (!isAuth) navigate(routes.login);
  }, [isAuth]);
  const handleOutClick = () => {
    dispatch(fetchOut());
  };
  if (isAuthLoading || !isAuth) return <Preloader />;
  return (
    <Container component="div" maxWidth="xs" style={{ marginTop: "150px" }}>
      <Stack spacing={4} justifyContent="center" alignItems="center" sx={{ width: "350px" }}>
        <Typography variant="h2" component="h2" fontWeight={700} fontSize={"26px"}>
          Профиль:
        </Typography>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid xs={4} alignItems={CENTER} justifyContent={CENTER}>
            <Stack sx={{ width: "100%", height: "100%" }} alignItems={START} justifyContent={CENTER}>
              <Avatar sx={{ bgcolor: deepPurple[500], width: "70px", height: "70px" }}>
                {user.first_name[0]} {user.middle_name[0]}
              </Avatar>
            </Stack>
          </Grid>
          <Grid xs={4}>
            <Stack spacing={2}>
              <TitleWithValue width={"220px"} title={"Имя:"}>
                {user.first_name}
              </TitleWithValue>
              <TitleWithValue width={"220px"} title={"Отчество:"}>
                {user.middle_name}
              </TitleWithValue>
              <TitleWithValue width={"220px"} title={"id:"}>
                {user.id}
              </TitleWithValue>
              <TitleWithValue width={"220px"} title={"email:"}>
                {user.email}
              </TitleWithValue>
            </Stack>
          </Grid>
        </Grid>
        <Button onClick={handleOutClick} color="secondary" variant="outlined" style={{ width: "220px" }}>
          Выход
        </Button>
      </Stack>
    </Container>
  );
};

export default Profile;
