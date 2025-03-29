import {INewSupplier, ISupplier} from "../../../models/iSuppliers";
import {basePath} from "../../../api";

const suppliersPath = `${basePath}/suppliers/`;

export const suppliersAPI = {
    addNew: async (supplier: INewSupplier) => {
        const res = await fetch(suppliersPath, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(supplier),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    getAll: async () => {
        const res = await fetch(suppliersPath, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    update: async (supplier: ISupplier) => {
        const res = await fetch(`${suppliersPath}${supplier.id}/`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(supplier),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
};