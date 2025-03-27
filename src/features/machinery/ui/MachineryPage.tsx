import React, {ChangeEvent, useState} from "react";
import {SelectChangeEvent, Stack, Typography} from "@mui/material";
import {useAppSelector} from "../../../hooks/redux";
import {getMachinery} from "../model/selectors";
import MachineryTable from "./MachineryTable";
import MachineryPageHeader from "./MachineryPageHeader";
import MachineryFilters, {machineryStatus} from "../MachineryFilters";

const MachineryPage = () => {
    const [machineryFilter, setMachineryFilter] = useState({
        type_id: -1,
        brand: "",
        engine_type_id: -1,
        status: -1,
    });
    let filteredMachinery = useAppSelector(getMachinery);
    const filterChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => {
        if (e && e.target.name) {
            setMachineryFilter(prev => ({...prev, [e.target.name]: e.target.value}));
        }
    };
    if (machineryFilter.type_id > 0) {
        filteredMachinery = filteredMachinery.filter(machinery => machinery.type_id === machineryFilter.type_id);
    }
    if (machineryFilter.engine_type_id > 0) {
        filteredMachinery = filteredMachinery.filter(machinery => machinery.engine_type_id === machineryFilter.engine_type_id);
    }
    if (machineryFilter.status > 0) {
        filteredMachinery = filteredMachinery.filter(machinery => machinery.status === machineryStatus[machineryFilter.status - 1].title);
    }
    if (machineryFilter.brand.length > 0) {
        filteredMachinery = filteredMachinery.filter(machinery => machinery.brand.toLowerCase().includes(machineryFilter.brand.toLowerCase())
            || machinery.model.toLowerCase().includes(machineryFilter.brand.toLowerCase()));
    }
    return (
        <Stack spacing={2} sx={{height: "100%"}}>
            <MachineryPageHeader/>
            <MachineryFilters machineryFilter={machineryFilter}
                              filterChangeHandler={filterChangeHandler}/>
            {filteredMachinery.length
                ? (<MachineryTable rows={filteredMachinery}/>)
                : (<Typography textAlign="center" mt={5}>
                    Нет техники , отвечающей параметрам фильтрации
                </Typography>)}

        </Stack>
    );
};

export default MachineryPage;
