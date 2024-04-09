import React, {FC} from "react";
import {Badge, BadgeProps, ListItem, ListItemButton, ListItemIcon, Typography} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {StyledBadge} from "../styles/const";

interface IProps {
    title: string,
    route: string,
    count?: number
}

const SideBarMenuItem: FC<IProps> = ({title, route, count = 0}) => {
    const patch: any = useLocation().pathname;
    const isActive = patch === route;
    return (
        <Link style={{textDecoration: "none", color: "white"}} to={route}>
            <ListItem key={title} disablePadding sx={{
                borderBottom: " 1px solid #404854",
                backgroundColor: isActive ? "black" : "",
                height: "65px",
                "&:hover": {
                    backgroundColor: isActive ? "" : "#404854",
                },
            }}>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <StyledBadge badgeContent={count} color="primary">
                        <Typography fontSize={"16px"} fontWeight={400}>
                            {title}
                        </Typography>
                    </StyledBadge>
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default SideBarMenuItem;