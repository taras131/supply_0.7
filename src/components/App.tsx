import Invoices from "features/invoices/ui/Invoices";
import Auth from "../features/auth/ui/Auth";
import {routes} from "utils/routes";
import {Routes, Route} from "react-router-dom";
import * as React from "react";
import Suppliers from "../pages/Suppliers";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {ISupplier} from "models/iSuppliers";
import {setSuppliers} from "store/reducers/suppliers";
import {IInvoice} from "models/iInvoices";
import Message from "./Message";
import Users from "../features/users/ui/Users";
import Profile from "../features/auth/ui/Profile";
import InvoiceDetails from "features/invoices/ui/InvoiceDetails";
import {setComments, setCommentsLoading} from "store/reducers/coments";
import {IComment} from "models/iComents";
import ShipmentsAddNew from "features/shipments/ui/ShipmentsAddNew";
import {setShipments, setShipmentsLoading} from "features/shipments/model/slice";
import MainMenu from "../pages/MainMenu";
import Orders from "features/orders/ui/Orders";
import OrderDetails from "features/orders/ui/OrderDetails";
import {setOrders, setOrdersLoading} from "features/orders/model/slice";
import {IOrder} from "models/iOrders";
import InvoicesAddNew from "features/invoices/ui/InvoicesAddNew";
import {getSuppliersIsLoading} from "store/selectors/suppliers";
import Page from "../features/machinery/ui/Page";
import MachineryDetails from "../features/machinery/ui/MachineryDetails";
import MachineryAddNew from "../features/machinery/ui/MachineryAddNew";
import Preloader from "./Preloader";
import Shipments from "features/shipments/ui/Shipments";
import {setInvoices} from "features/invoices/model/slice";
import {fetchCheckAuth} from "../features/auth/model/actions";
import Layout from "./Layout";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const supplierIsLoading = useAppSelector((state) => getSuppliersIsLoading(state));
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCheckAuth());
    }, []);
    useEffect(() => {
        const q = query(collection(db, "invoices"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                const invoicesArr: IInvoice[] = [];
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
                const suppliesArr: ISupplier[] = [];
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
        const q = query(collection(db, "comments"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                dispatch(setCommentsLoading(true));
                const commentsArr: IComment[] = [];
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
                const shipmentsArr: IShipments[] = [];
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
                const ordersArr: IOrder[] = [];
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
    if (isLoading || supplierIsLoading) {
        return <Preloader/>;
    }
    return (
        <Layout>
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
                <Route path={routes.machinery} element={<Page/>}/>
                <Route path={routes.addNewMachinery} element={<MachineryAddNew/>}/>
                <Route path={routes.machinery + "/:machineryId/"} element={<MachineryDetails/>}/>
            </Routes>
            <Message />
        </Layout>
    );
}

export default App;
