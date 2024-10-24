import React from "react";
import {CENTER, COLUMN, ROW, SPACE_BETWEEN} from "styles/const";
import {FormControl, FormHelperText, SelectChangeEvent, Stack, TextField, useMediaQuery} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {setMachineryIdFilter, setOrdersSearch} from "features/orders/model/slice";
import {selectMachineryIdFilter, selectOrdersSearch} from "features/orders/model/selectors";
import MachinerySelect from "features/orders/ui/MachinerySelect";

const OrdersFilter = () => {
    const matches_700 = useMediaQuery("(min-width:700px)");
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectOrdersSearch);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setOrdersSearch(event.target.value as string));
    };
    const handleMachineryChange = (e: SelectChangeEvent<string>) => {
        dispatch(setMachineryIdFilter(e.target.value as string));
    };
    const machineryIdFilter = useAppSelector(selectMachineryIdFilter);
    return (
        <Stack
            sx={{ maxWidth: "1350px", width: "100%" }}
            spacing={2}
            direction={matches_700 ? ROW : COLUMN}
            alignItems={CENTER}
            justifyContent={matches_700 ? SPACE_BETWEEN : CENTER}
        >

            <FormControl fullWidth size={matches_700 ? "medium" : "small"}>
                <TextField value={search} onChange={handleSearchChange} label={"Искать"} />
                <FormHelperText>Отфильтровать по заголовку</FormHelperText>
            </FormControl>
           <MachinerySelect machineryId={machineryIdFilter}
                            label={"Отфильтровать по технике"}
                            handleMachineryChange={handleMachineryChange}/>
        </Stack>
    );
};

export default OrdersFilter;