import React, {FC, useId} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useMediaQuery} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {getSuppliers} from "../store/selectors/suppliers";
import InvoicesFilterCheckBoxes from "./InvoicesFilterCheckBoxes";
import {CENTER, COLUMN, ROW, SPACE_BETWEEN} from "../styles/const";
import Stack from "@mui/material/Stack";
import {ALL} from "../utils/const";

interface IProps {
    filter: string,
    setFilter: (value: string) => void,
    isShowCanceledInvoice: boolean
    isShowPaidInvoice: boolean
    handleCanceledInvoiceChange: () => void
    handlePaidInvoiceChange: () => void
}

const InvoicesFilter: FC<IProps> = ({
                                        filter,
                                        setFilter,
                                        isShowCanceledInvoice,
                                        isShowPaidInvoice,
                                        handleCanceledInvoiceChange,
                                        handlePaidInvoiceChange,
                                    }) => {
    const matches_700 = useMediaQuery("(min-width:700px)");
    const selectId = useId();
    const labelId = useId();
    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };
    const suppliers = useAppSelector(state => getSuppliers(state))
    const menuItems = suppliers.map(supplier => (<MenuItem key={supplier.id} value={supplier.id}>
        {supplier.name}
    </MenuItem>))
    return (
        <Stack sx={{maxWidth: "1350px",width: "100%"}}
               direction={matches_700 ? ROW : COLUMN}
               alignItems={CENTER}
               justifyContent={matches_700 ? SPACE_BETWEEN : CENTER}>
            <FormControl fullWidth size={matches_700 ? "medium" : "small"}>
                <InputLabel id={labelId}>Поставщик</InputLabel>
                <Select
                    id={selectId}
                    labelId={labelId}
                    value={filter}
                    label={"Поставщик"}
                    onChange={handleChange}
                >
                    <MenuItem value={ALL}>Все</MenuItem>
                    {menuItems}
                </Select>
            </FormControl>
            <InvoicesFilterCheckBoxes isShowCanceledInvoice={isShowCanceledInvoice}
                                      handleCanceledInvoiceChange={handleCanceledInvoiceChange}
                                      isShowPaidInvoice={isShowPaidInvoice}
                                      handlePaidInvoiceChange={handlePaidInvoiceChange}/>
        </Stack>
    );
};

export default InvoicesFilter;