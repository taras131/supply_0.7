import React, {FC} from "react";
import BaseTable from "../../../components/common/BaseTable";
import {ITableColumn} from "../../../models/ITable";
import {ISupplier} from "../../../models/iSuppliers";
import {useAppSelector} from "../../../hooks/redux";
import {getAmountBySupplierId} from "../../invoices/model/selectors";
import {useMediaQuery} from "@mui/material";

interface IProps {
    rows: ISupplier[] | null;
    onSupplierClick: (supplierId: number) => void;
    activeRowId: number | null;
}

const SuppliersTable: FC<IProps> = ({rows, onSupplierClick, activeRowId}) => {
    const matches_650 = useMediaQuery("(max-width:650px)");
    if (!rows) return null;
    const amountsPaidBySupplier = useAppSelector(state =>
        rows.reduce((acc, row) => {
            const key = row.old_id ? row.old_id : `${row.id}`;
            acc[key] = getAmountBySupplierId(state, key);
            return acc;
        }, {} as Record<string, number>)
    );
    const rowClickHandler = (supplier: ISupplier) => {
        onSupplierClick(supplier.id);
    };
    const columns: ITableColumn<ISupplier>[] = [
        {
            key: "name",
            label: "Наименование",
        },
        {
            key: "INN",
            label: "ИНН",
        },
        {
            key: "city",
            label: "Город",
            isHidden: matches_650,
        },
        {
            key: "operating",
            label: "Оборот",
            getValue: (row) => {
                const key = row.old_id ? row.old_id : `${row.id}`;
                const amountPaidInvoice = amountsPaidBySupplier[key] || 0;
                return new Intl.NumberFormat("ru-RU").format(amountPaidInvoice);
            },
        },
    ];
    return (
        <BaseTable
            rows={rows}
            columns={columns}
            onRowClick={rowClickHandler}
            activeRowId={activeRowId}
            minWidth="380px"
        />
    );
};

export default SuppliersTable;