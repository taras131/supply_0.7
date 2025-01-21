import { FC } from "react";
import { IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { getIsAuth, getUser } from "../features/auth/model/selectors";
import { routes } from "../utils/routes";
import { drawerWidth } from "../utils/const";

interface IProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: FC<IProps> = ({ open, handleDrawerOpen }) => {
  const isAuth = useAppSelector((state) => getIsAuth(state));
  const user = useAppSelector((state) => getUser(state));
  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon sx={{ color: "black" }} />
        </IconButton>
        <Stack sx={{ width: "100%" }} alignItems={"center"} justifyContent={"end"} direction="row">
          {isAuth ? (
            <Link to={routes.profile}>
              <Typography color="black">
                {user.first_name} {user.middle_name}
              </Typography>
            </Link>
          ) : (
            <Link to={routes.login}>
              <Typography color="black">Войти</Typography>
            </Link>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
