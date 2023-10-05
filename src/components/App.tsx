import MainPage from "../pages/MainPage";
import Invoices from "../pages/Invoices";
import Auth from "../pages/Auth";
import {routes} from "../utils/routes";
import {Routes, Route} from "react-router-dom";
import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./Header";
import SideBar from "./SideBar";
import Suppliers from "../pages/Suppliers";
import {useAppDispatch} from "../hooks/redux";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {ISupplier} from "../models/iSuppliers";
import {setSuppliers} from "../store/reducers/suppliers";
import {Typography} from "@mui/material";
import {IInvoice} from "../models/iInvoices";
import {setInvoices} from "../store/reducers/invoices";
import Message from "./Message";


export const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function App() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const q = query(collection(db, "invoices"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                let invoicesArr: IInvoice [] = []
                querySnapshot.forEach((doc: any) => {
                    invoicesArr.push({...doc.data(), id: doc.id});
                });
                console.log(invoicesArr)
                dispatch(setInvoices(invoicesArr))
            } catch (e) {
                alert(e);
            }
            return () => unsubscribe();
        });
    }, [])

    useEffect(() => {
        const q = query(collection(db, "suppliers"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                let suppliesArr: ISupplier [] = []
                querySnapshot.forEach((doc: any) => {
                    suppliesArr.push({...doc.data(), id: doc.id});
                });
                console.log(suppliesArr)
                dispatch(setSuppliers(suppliesArr))
                setIsLoading(false)
            } catch (e) {
                alert(e);
            }
            return () => unsubscribe();
        });
    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    if (isLoading) {
        return (<Typography>...Загрузка...</Typography>)
    }
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
            <SideBar open={open} handleDrawerClose={handleDrawerClose}/>
            <Main open={open} sx={{backgroundColor: "#f3f7fa"}}>
                <DrawerHeader/>
                <Routes>
                    <Route path={routes.main} element={<MainPage/>}/>
                    <Route path={routes.invoices} element={<Invoices/>}/>
                    <Route path={routes.suppliers} element={<Suppliers/>}/>
                    <Route path={routes.login} element={<Auth/>}/>
                    <Route path={routes.register} element={<Auth/>}/>
                </Routes>
            </Main>
            <Message/>
        </Box>
    )
}

export default App
