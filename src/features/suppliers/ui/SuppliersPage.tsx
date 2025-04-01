import React, {ChangeEvent, useEffect, useState} from "react";
import {
    SelectChangeEvent,
    Stack, Typography,
} from "@mui/material";
import SuppliersPageHeader from "./SuppliersPageHeader";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {selectSuppliers} from "../model/selectors";
import {fetchGetSuppliers} from "../model/actions";
import SuppliersTable from "./SuppliersTable";
import {useProblemDrawer} from "../../../hooks/useProblemDrawer";
import SupplierDrawer from "./SupplierDrawer";

const SuppliersPage = () => {
    const dispatch = useAppDispatch();
    const {drawerState, openDrawer, closeDrawer} = useProblemDrawer();
    const [suppliersFilter, setSuppliersFilter] = useState({
        name: "",
    });
    let filteredSuppliers = useAppSelector(selectSuppliers);
    useEffect(() => {
        dispatch(fetchGetSuppliers());
    }, []);
    const filterChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => {
        if (e && e.target.name) {
            setSuppliersFilter(prev => ({...prev, [e.target.name]: e.target.value}));
        }
    };
    const handleAddClick = () => {
        openDrawer("create");
    };
    const onSupplierClick = (supplierId: number) => {
        openDrawer("view", supplierId);
    };

    if (suppliersFilter.name.length > 0) {
        filteredSuppliers = filteredSuppliers.filter(supplier => supplier.name.toLowerCase().includes(suppliersFilter.name.toLowerCase()));
    }
    return (
        <Stack spacing={4} pt={3}  >
            <SuppliersPageHeader suppliersFilter={suppliersFilter}
                                 handleAddClick={handleAddClick}
                                 filterChangeHandler={filterChangeHandler}/>
            {filteredSuppliers.length > 0
                ? (<SuppliersTable rows={filteredSuppliers}
                                   onSupplierClick={onSupplierClick}
                                   activeRowId={drawerState.problemId}/>)
                : (<Typography textAlign="center" mt={5}>
                    Нет поставщиков , отвечающей параметрам фильтрации
                </Typography>)}
            <SupplierDrawer isOpen={drawerState.isOpen}
                            onClose={closeDrawer}
                            mode={drawerState.mode}
                            currentSupplierId={drawerState.problemId || 0}/>
        </Stack>
    );
};

export default SuppliersPage;
