import React, {useEffect} from 'react';
import {ISuppliers} from "../models/iSuppliers";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setSuppliers} from "../store/reducers/suppliers";
import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {getSuppliers} from "../store/selectors/suppliers";
import Supplier from "../components/Supplier";
import SuppliersHeader from "../components/SuppliersHeader";

const Suppliers = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const q = query(collection(db, "suppliers"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            try {
                let suppliesArr: ISuppliers [] = []
                querySnapshot.forEach((doc: any) => {
                    suppliesArr.push({...doc.data(), id: doc.id});
                });
                dispatch(setSuppliers(suppliesArr))
            } catch (e) {
                alert(e);
            }
            return () => unsubscribe();
        });
    }, [])
    const suppliers = useAppSelector(state => getSuppliers(state))
    const suppliersList = suppliers.map(supplier => (<Supplier key={supplier.id} {...supplier}/>))
    return (
        <Stack style={{minHeight: "calc(100vh - 60px"}} alignItems="center">
           <SuppliersHeader/>
            <TableContainer component={Paper} sx={{maxWidth: 850}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Поставщик</TableCell>
                            <TableCell align="right">ИНН</TableCell>
                            <TableCell align="right">id</TableCell>
                            <TableCell align="right">Оборот</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliersList}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};

export default Suppliers;