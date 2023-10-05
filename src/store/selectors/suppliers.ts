import {RootState} from "../index";
import {ISupplier} from "../../models/iSuppliers";



export const getSuppliers = (state: RootState): ISupplier [] => {
    return state.suppliers.list
}
export const getSupplierNameById = (state: RootState, supplierId: string) => {
    return state.suppliers.list.filter(supplier => supplier.id === supplierId)[0].name
}
export const getSupplierINNById = (state: RootState, supplierId: string) => {
    return state.suppliers.list.filter(supplier => supplier.id === supplierId)[0].INN
}