import { RootState } from "../index";
import { ISupplier } from "../../models/iSuppliers";

const collator = new Intl.Collator("ru");

/*export const getSuppliers = (state: RootState): ISupplier [] => {
    const arr = [...state.suppliers.list];
    return arr.sort((a, b) => {
        const nameA = a.name.split(" ")[1].toLowerCase();
        const nameB = b.name.split(" ")[1].toLowerCase();
        return collator.compare(nameA, nameB);
    });
};*/
export const getSupplierNameById = (state: RootState, supplierId: string) => {
  const supplier = state.suppliers.list.find((supplier) => supplier.id === supplierId);
  if (supplier && supplier.name) {
    return supplier.name;
  } else {
    return "";
  }
};
export const getSupplierINNById = (state: RootState, supplierId: string) => {
  return state.suppliers.list.filter((supplier) => supplier.id === supplierId)[0].INN;
};

export const getSuppliersIsLoading = (state: RootState) => {
  return state.suppliers.isLoading;
};

export const getSuppliersCount = (state: RootState): number => {
  return state.suppliers.list.length;
};
