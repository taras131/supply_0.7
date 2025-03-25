import React, {FC} from "react";
import {IRouteConfig} from "../config/routes";
import SideBarNavItem from "./SideBarNavItem";
import Box from "@mui/material/Box";
import {useAppSelector} from "../hooks/redux";
import {getIsAuth} from "../features/auth/model/selectors";
import {routes} from "../utils/routes";
import SideBarNavAccordion from "./common/SideBarNavAccordion";

interface IProps {
    routesConfig: IRouteConfig []
}

const SideBarNav: FC<IProps> = ({routesConfig}) => {
    const isAuth = useAppSelector((state) => getIsAuth(state));
    return (
        <Box component="nav" sx={{flex: "1 1 auto", p: "12px"}}>
            {routesConfig.map(menuItem => {
                    if (menuItem.subRoutes) {
                        return (<SideBarNavAccordion key={menuItem.path}
                                                     title={menuItem.label}
                                                     routesConfig={menuItem.subRoutes}/>);
                    } else {
                        return (<SideBarNavItem key={menuItem.path}
                                                title={menuItem.label}
                                                route={menuItem.path}/>);
                    }
                }
            )}
            {isAuth ? (
                <SideBarNavItem title={"Профиль"} route={routes.profile}/>
            ) : (
                <>
                    <SideBarNavItem title={"Вход"} route={routes.login}/>
                    <SideBarNavItem title={"Регистрация"} route={routes.register}/>
                </>
            )}
        </Box>
    );
};

export default SideBarNav;