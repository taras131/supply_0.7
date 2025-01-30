import React, {FC} from "react";
import {ListItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import {navIcons} from "./navIcons";

interface IProps {
    title: string;
    route: string;
    count?: number;
    icon?: string;
}

const SideBarMenuItem: FC<IProps> = ({title, route, icon}) => {
    const patch: any = useLocation().pathname;
    const isActive =
        route === "/"
            ? patch === route
            : patch.startsWith(route);
    const Icon = icon ? navIcons[icon] : null;
    return (
        <Link style={{textDecoration: "none", color: "white"}} to={route}>
            <ListItem
                key={title}
                disablePadding
                sx={{
                    alignItems: "center",
                    marginBottom: "8px",
                    borderRadius: 1,
                    color: "var(--NavItem-color)",
                    cursor: "pointer",
                    display: "flex",
                    flex: "0 0 auto",
                    gap: 1,
                    p: "6px 16px",
                    position: "relative",
                    textDecoration: "none",
                    height: "var(--MainNav-height)",
                    whiteSpace: "nowrap",

                    "&:hover": {
                        backgroundColor: isActive ? "var(--NavItem-active-background)" : "var(--NavItem-hover-background)",
                        color: isActive ? "var(--NavItem-active-color)" : "var(--NavItem-hover-color)",
                    },
                    ...(isActive && {
                        backgroundColor: "var(--NavItem-active-background)",
                        color: "var(--NavItem-active-color)",
                    }),
                }}
            >
                <Box sx={{alignItems: "center", display: "flex", justifyContent: "center", flex: "0 0 auto"}}>
                    {Icon ? (
                        <Icon
                            fill={isActive ? "var(--NavItem-icon-active-color)" : "var(--NavItem-icon-color)"}
                            fontSize="var(--icon-fontSize-md)"
                            weight={isActive ? "fill" : undefined}
                        />
                    ) : null}
                </Box>
                <Box sx={{flex: "1 1 auto"}}>
                    <Typography
                        component="span"
                        sx={{
                            color: "inherit",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            lineHeight: "28px",
                        }}
                    >
                        {title}
                    </Typography>
                </Box>

            </ListItem>
        </Link>
    );
};

export default SideBarMenuItem;
