import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../../store";

const selectSuppliersState = (state: RootState) => state.suppliers;

export const selectSuppliers = createSelector(
    [selectSuppliersState],
    (suppliersState) => {
        const list = suppliersState.list || []; // Гарантия массива
        return list.slice().sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "ru");
        });
    }
);

export const selectSupplierById = createSelector(
    [
        (state: RootState) => state.suppliers.list,
        (_state: RootState, supplierId: number) => supplierId,
    ],
    (suppliers, supplierId) => {
        return suppliers.find(supplier => supplier.id === supplierId) || null;
    }
);
