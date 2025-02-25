import React, {FC} from "react";
import {GlobalStyles} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SideBar from "./SideBar";
import Header from "./Header";
import backgroundImage from "../assets/images/background.jpg";

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
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    minHeight: "100%",
             /*       backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0.7),
                    rgba(0, 0, 0, 0.7)
                    ), url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",*/

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