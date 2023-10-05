import React, {FC} from 'react';
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";


interface IProps {
    title: string,
    route: string
}

const SideBarMenuItem: FC<IProps> = ({title, route}) => {
    const patch: any = useLocation().pathname
    const isActive = patch === route
    return (
        <Link style={{textDecoration: "none", color: "white",}} to={route}>
            <ListItem key={title} disablePadding sx={{
                borderBottom: " 1px solid #404854",
                backgroundColor: isActive ? "black" : "",
                height: "65px",
                '&:hover': {
                    backgroundColor: isActive ? "" : "#404854"
                }
            }}>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon color={"white"}/>
                    </ListItemIcon>
                    <Typography fontSize={"16px"} fontWeight={400}>
                        {title}
                    </Typography>
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default SideBarMenuItem;