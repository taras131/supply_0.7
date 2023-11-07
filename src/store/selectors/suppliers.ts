import {RootState} from "../index";
import {ISupplier} from "../../models/iSuppliers";

const collator = new Intl.Collator("ru");

export const getSuppliers = (state: RootState): ISupplier [] => {
    const arr = [...state.suppliers.list];
    return arr.sort((a, b) => {
        const nameA = a.name.split('"')[1].toLowerCase();
        const nameB = b.name.split('"')[1].toLowerCase();
        console.log(nameA)
        return collator.compare(nameA, nameB);
    });
};
export const getSupplierNameById = (state: RootState, supplierId: string) => {
    return state.suppliers.list.filter(supplier => supplier.id === supplierId)[0].name;
};
export const getSupplierINNById = (state: RootState, supplierId: string) => {
    return state.suppliers.list.filter(supplier => supplier.id === supplierId)[0].INN;
};