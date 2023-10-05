import {FC} from 'react';
import {drawerWidth} from "./App";
import {Drawer, Stack, styled, Typography, useTheme} from "@mui/material";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SideBarMenuItem from "./SideBarMenuItem";
import {routes} from "../utils/routes";
import MenuIcon from '@mui/icons-material/Menu';


interface IProps {
    open: boolean
    handleDrawerClose: () => void
}

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const SideBar: FC<IProps> = ({open, handleDrawerClose}) => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: "#272e3d",
                    color: "white"
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{width: "100%"}}>
                    <Typography fontSize={"20px"} fontWeight={700}>
                        Иткана
                    </Typography>
                    <IconButton sx={{color: "white"}} onClick={handleDrawerClose}>
                        <MenuIcon/>
                    </IconButton>
                </Stack>

            </DrawerHeader>
            <Divider color={"#404854"}/>
            <List disablePadding>
                <SideBarMenuItem title={"Главная"} route={routes.main}/>
                <SideBarMenuItem title={"Счета"} route={routes.invoices}/>
                <SideBarMenuItem title={"Поставщики"} route={routes.suppliers}/>
                <SideBarMenuItem title={"Вход"} route={routes.login}/>
                <SideBarMenuItem title={"Регистрация"} route={routes.register}/>
            </List>
        </Drawer>
    );
};

export default SideBar;