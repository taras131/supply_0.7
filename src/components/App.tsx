import {Routes, Route} from "react-router-dom";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {ISupplier} from "models/iSuppliers";
import {setSuppliers} from "store/reducers/suppliers";
import {IInvoice} from "models/iInvoices";
import Message from "./Message";
import {setComments, setCommentsLoading} from "store/reducers/coments";
import {IComment} from "models/iComents";
import {setShipments, setShipmentsLoading} from "features/shipments/model/slice";
import {setOrders, setOrdersLoading} from "features/orders/model/slice";
import {IOrder} from "models/iOrders";
import {getSuppliersIsLoading} from "store/selectors/suppliers";
import Preloader from "./Preloader";
import {setInvoices} from "features/invoices/model/slice";
import {fetchCheckAuth} from "../features/auth/model/actions";
import Layout from "./Layout";
import {routesConfig} from "../config/routes";
import {IShipments} from "../models/iShipments";

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
                {routesConfig.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
            <Message />
        </Layout>
    );
}

export default App;
