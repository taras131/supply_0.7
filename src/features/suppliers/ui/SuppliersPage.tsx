import React, {useEffect} from "react";
import {
    Stack,
} from "@mui/material";
import SuppliersHeader from "./SuppliersHeader";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {selectSuppliers} from "../model/selectors";
import {fetchGetSuppliers} from "../model/actions";
import SuppliersTable from "./SuppliersTable";
import {useProblemDrawer} from "../../../hooks/useProblemDrawer";
import SupplierDrawer from "./SupplierDrawer";

const SuppliersPage = () => {
    const dispatch = useAppDispatch();
    const {drawerState, openDrawer, closeDrawer} = useProblemDrawer();
    const suppliers = useAppSelector(selectSuppliers);
    const handleAddClick = () => {
        openDrawer("create");
    };
    const onSupplierClick = (supplierId: number) => {
        openDrawer("view", supplierId);
    };
    useEffect(() => {
        dispatch(fetchGetSuppliers());
    }, []);
    return (
        <Stack spacing={4} pt={3} alignItems="center">
            <SuppliersHeader handleAddClick={handleAddClick}/>
            {suppliers.length > 0 && (
                <SuppliersTable rows={suppliers}
                                onSupplierClick={onSupplierClick}
                                activeRowId={drawerState.problemId}/>
            )}
            <SupplierDrawer isOpen={drawerState.isOpen}
                            onClose={closeDrawer}
                            mode={drawerState.mode}
                            currentSupplierId={drawerState.problemId || 0}/>
        </Stack>
    );
};

export default SuppliersPage;
