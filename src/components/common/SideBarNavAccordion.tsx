import React, {FC, useState} from "react";
import {IRouteConfig} from "../../config/routes";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SideBarNavItem from "../SideBarNavItem";

interface IProps {
    title: string;
    routesConfig: IRouteConfig []
}

const SideBarNavAccordion: FC<IProps> = ({title, routesConfig}) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(prev => !prev);
    };
    return (
        <Accordion expanded={expanded}
                   onChange={toggleExpanded}
                   sx={{
                       marginBottom: "8px",
                       backgroundColor: "inherit",
                       boxShadow: "none",
                   }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon
                    sx={{
                        color: "var(--NavItem-color)",
                    }}/>}
                aria-controls="nav-content"
                id="panel1bh-header"
                sx={{
                    color: "var(--NavItem-color)",
                    height: "var(--MainNav-height)",
                    p: "0 16px",
                    borderRadius: 1,
                    "&:hover": {
                        backgroundColor: "var(--NavItem-hover-background)",
                        color: "var(--NavItem-active-color)",
                    },
                }}
            >
                <Typography component="span"
                            sx={{marginLeft: "6px", fontSize: "14px", fontWeight: "500", lineHeight: "28px"}}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{padding: "8px 16px 0 32px"}}>
                {routesConfig.map(menuItem => (<SideBarNavItem key={menuItem.path}
                                                               title={menuItem.label}
                                                               route={menuItem.path}
                                                               setExpanded={setExpanded}/>))}
            </AccordionDetails>
        </Accordion>
    );
};

export default SideBarNavAccordion;