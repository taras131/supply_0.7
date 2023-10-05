import {RootState} from "../index";
import {ISuppliers} from "../../models/iSuppliers";

export const getSuppliers = (state: RootState): ISuppliers [] => {
    return state.suppliers.list
}