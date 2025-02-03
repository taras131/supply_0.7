import React, {FC} from "react";
import {GlobalStyles} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SideBar from "./SideBar";
import Header from "./Header";

interface IProps {
    children: React.ReactNode;
}

const Layout: FC<IProps> = ({children}) => {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <GlobalStyles
                styles={{
                    body: {
                        "--MainNav-height": "56px",
                        "--MainNav-zIndex": 1000,
                        "--SideNav-width": "240px",
                        "--SideNav-zIndex": 1100,
                        "--MobileNav-width": "320px",
                        "--MobileNav-zIndex": 1100,
                    },
                }}
            />
            <Box
                sx={{
                    bgcolor: "var(--mui-palette-background-default)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    minHeight: "100%",
                }}
            >
                <SideBar open={open} handleDrawerClose={handleDrawerClose}/>
                <Box
                    sx={{display: "flex", flex: "1 1 auto", flexDirection: "column", pl: {lg: "var(--SideNav-width)"}}}>
                    <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
                    <main>
                        <Container maxWidth="xl" sx={{py: "84px", minHeight: "100vh"}}>
                            {children}
                        </Container>
                    </main>
                </Box>
            </Box>
        </>
    );
};

export default Layout;