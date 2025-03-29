import {INewSupplier, ISupplier} from "../../../models/iSuppliers";

export const newSupplier: INewSupplier = {
    name: "",
    INN: 0,
    city: "",
    old_id: "",
    phone: "",
    manager_email: "",
    accounts_department_email: "",
    kpp: 0,
    Legal_address: "",
    bik: 0,
    correspondent_account: 0,
    payment_account: 0,
    bank: "",
    ogrn: 0,
    okpo: 0,
    okato: 0,
    okogu: 0,
};

export const defaultSupplier: ISupplier = {
    ...newSupplier,
    id: 0,
    updated_date: 0,
    created_date: 0,
};