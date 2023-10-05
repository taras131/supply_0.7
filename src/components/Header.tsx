import {FC} from 'react';
import {IconButton, Stack, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {drawerWidth} from "./App";
import {useLocation} from "react-router-dom";
import InvoicesInfo from "./InvoicesInfo";


interface IProps {
    open: boolean
    handleDrawerOpen: () => void
}

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Header: FC<IProps> = ({open, handleDrawerOpen}) => {
    const path = useLocation().pathname
    return (
        <AppBar position="fixed" open={open} sx={{backgroundColor: "white"}}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{mr: 2, ...(open && {display: 'none'})}}
                >
                    <MenuIcon sx={{color: "black"}}/>
                </IconButton>
                <Stack sx={{width: "100%" , ml: -5}}  alignItems={"center"} justifyContent={"center"}>
                    {path === "/invoices" && (<InvoicesInfo/>)}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Header;