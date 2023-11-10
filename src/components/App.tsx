import Invoices from "../pages/Invoices";
import Auth from "../pages/Auth";
import {routes} from "../utils/routes";
import {Routes, Route} from "react-router-dom";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import SideBar from "./SideBar";
import Suppliers from "../pages/Suppliers";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {ISupplier} from "../models/iSuppliers";
import {setSuppliers} from "../store/reducers/suppliers";
import {Typography, useMediaQuery} from "@mui/material";
import {IInvoice} from "../models/iInvoices";
import {setInvoices} from "../store/reducers/invoices";
import Message from "./Message";
import Users from "../pages/Users";
import {IUser} from "../models/iAuth";
import {setAllUsers, setCurrentUser} from "../store/reducers/auth";
import Profile from "../pages/Profile";
import InvoiceDetails from "../pages/InvoiceDetails";
import {drawerWidth} from "../utils/const";
import {setComments, setCommentsLoading} from "../store/reducers/coments";
import {IComment} from "../models/iComents";
import Shipments from "../pages/Shipments";
import ShipmentsAddNew from "../pages/ShipmentsAddNew";
import {IShipments} from "../models/iShipments";
import {setShipments, setShipmentsLoading} from "../store/reducers/shipment";
import MainMenu from "../pages/MainMenu";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";

import {setOrders, setOrdersLoading} from "../store/reducers/orders";
import {IOrder} from "../models/iOrders";
import InvoicesAddNew from "../pages/InvoicesAddNew";
import {getSuppliersIsLoading} from "../store/selectors/suppliers";
import {isLoggedIn} from "../api/session";
import api from "../api";
import {getAuth} from "firebase/auth";
import {getAllUsers} from "../store/selectors/auth";

const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})<{
    open?: boolean;
    matches_1600?: boolean;
}>(({theme, open, matches_1600}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: matches_1600 ? `-${drawerWidth}px` : 0,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));


function App() {
    const matches_1600 = useMediaQuery("(min-width:1600px)");
    const matches_700 = useMediaQuery("(min-width:700px)");
    const [open, setOpen] = React.useState(matches_1600 ? true : false);
    const [isLoading, setIsLoading] = useState(true);
    const supplierIsLoading = useAppSelector(state => getSuppliersIsLoading(state));

    const dispatch = useAppDispatch();
    useEffect(() => {
        const q = query(collection(db, "invoices"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                const invoicesArr: IInvoice [] = [];
                querySnapshot.forEach((doc: any) => {
                    invoicesArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setInvoices(invoicesArr));
            } catch (e) {
                alert(e);
            }
            return () => unsubscribe();
        });
    }, []);

    useEffect(() => {
        const q = query(collection(db, "suppliers"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                const suppliesArr: ISupplier [] = [];
                querySnapshot.forEach((doc: any) => {
                    suppliesArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setSuppliers(suppliesArr));
                setIsLoading(false);
            } catch (e) {
                alert(e);
            }
            return () => unsubscribe();
        });
    }, []);

    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                const usersArr: IUser [] = [];
                querySnapshot.forEach((doc: any) => {
                    usersArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setAllUsers(usersArr));
                setIsLoading(false);
            } catch (e) {
                alert(e);
            }
            return () => unsubscribe();
        });
    }, []);
    useEffect(() => {
        const q = query(collection(db, "comments"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setCommentsLoading(true));
                const commentsArr: IComment [] = [];
                querySnapshot.forEach((doc: any) => {
                    commentsArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setComments(commentsArr));
                dispatch(setCommentsLoading(false));
            } catch (e) {
                dispatch(setCommentsLoading(false));
                alert(e);
            }
            return () => unsubscribe();
        });
    }, []);
    useEffect(() => {
        const q = query(collection(db, "shipments"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setShipmentsLoading(true));
                const shipmentsArr: IShipments [] = [];
                querySnapshot.forEach((doc: any) => {
                    shipmentsArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setShipments(shipmentsArr));
                dispatch(setShipmentsLoading(false));
            } catch (e) {
                dispatch(setShipmentsLoading(false));
                alert(e);
            }
            return () => unsubscribe();
        });
    }, []);
    useEffect(() => {
        const q = query(collection(db, "orders"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setOrdersLoading(true));
                const ordersArr: IOrder [] = [];
                querySnapshot.forEach((doc: any) => {
                    ordersArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setOrders(ordersArr));
                dispatch(setOrdersLoading(false));
            } catch (e) {
                dispatch(setOrdersLoading(false));
                alert(e);
            }
            return () => unsubscribe();
        });
    }, []);
    const users = useAppSelector(state => getAllUsers(state));
    useEffect(() => {
        getAuth().onAuthStateChanged(function (user) {
            console.log(user)
            if (user && user.email) {
                dispatch(setCurrentUser(user.email))
            }
        });
    }, [users])
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    if (isLoading || supplierIsLoading) {
        return (<Typography>...Загрузка...</Typography>);
    }
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
            <SideBar open={open} handleDrawerClose={handleDrawerClose}/>
            <Main open={open} matches_1600={matches_1600} sx={{backgroundColor: "#f3f7fa"}} style={{
                paddingLeft: matches_700 ? 20 : 5,
                paddingRight: matches_700 ? 20 : 5,
            }}>
                <DrawerHeader/>
                <Routes>
                    <Route path={routes.main} element={<MainMenu/>}/>
                    <Route path={routes.invoices} element={<Invoices/>}/>
                    <Route path={routes.invoices + "/:invoiceId/"} element={<InvoiceDetails/>}/>
                    <Route path={routes.invoices + "/add_new"} element={<InvoicesAddNew/>}/>
                    <Route path={routes.suppliers} element={<Suppliers/>}/>
                    <Route path={routes.shipments} element={<Shipments/>}/>
                    <Route path={routes.addNewShipments} element={<ShipmentsAddNew/>}/>
                    <Route path={routes.orders} element={<Orders/>}/>
                    <Route path={routes.orders + "/:orderId/"} element={<OrderDetails/>}/>
                    <Route path={routes.users} element={<Users/>}/>
                    <Route path={routes.login} element={<Auth/>}/>
                    <Route path={routes.register} element={<Auth/>}/>
                    <Route path={routes.profile} element={<Profile/>}/>
                </Routes>
            </Main>
            <Message/>
        </Box>
    );
}

export default App;