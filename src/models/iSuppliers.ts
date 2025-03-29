export interface INewSupplier {
    name: string;
    INN: number;
    city: string;
    old_id: string;
    phone: string;
    manager_email: string;
    accounts_department_email: string;
    kpp: number;
    Legal_address: string;
    bik: number;
    correspondent_account: number;
    payment_account: number;
    bank: string;
    ogrn: number;
    okpo: number;
    okato: number;
    okogu: number;
}

export interface ISupplier extends INewSupplier {
    id: number;
    updated_date: number;
    created_date: number;
}
