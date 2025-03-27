import React, {ChangeEvent, FC, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {engineTypes, MachineryStatus, machineryTypes} from "./utils/const";
import {useAppSelector} from "../../hooks/redux";
import {getActualEngineTypes, getActualMachineryTypes} from "./model/selectors";
import FilterSelect from "../../components/common/FilterSelect";
import SearchTextField from "../../components/common/SearchTextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const machineryStatus = [
    {id: 1, title: MachineryStatus.active},
    {id: 2, title: MachineryStatus.repair},
    {id: 3, title: MachineryStatus.disActive},
];

interface IProps {
    machineryFilter: {
        type_id: number,
        brand: string,
        engine_type_id: number,
        status: number,
    };
    filterChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => void;
}

const MachineryFilters: FC<IProps> = ({
                                          machineryFilter,
                                          filterChangeHandler,
                                      }) => {
    const [expanded, setExpanded] = useState(false);
    const actualMachineryTypes = useAppSelector(state => getActualMachineryTypes(state, machineryTypes));
    const actualEngineTypes = useAppSelector(state => getActualEngineTypes(state, engineTypes));
    const handleChange = () => {
        setExpanded(prev => (!prev));
    };
    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="filter-content"
                id="filter"
            >
                <Typography component="span" sx={{width: "33%", flexShrink: 0}}>
                    Фильтры
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="row"
                       spacing={1}
                       alignItems="center"
                       justifyContent="center"
                       sx={{width: "100%", flexWrap: "wrap"}}>
                    <FilterSelect label="Тип техники"
                                  name="type_id"
                                  value={machineryFilter.type_id}
                                  onChange={filterChangeHandler}
                                  options={actualMachineryTypes}/>
                    <FilterSelect label="Статус"
                                  name="status"
                                  value={machineryFilter.status}
                                  onChange={filterChangeHandler}
                                  options={machineryStatus}/>
                    <FilterSelect label="Тип двигателя"
                                  name="engine_type_id"
                                  value={machineryFilter.engine_type_id}
                                  onChange={filterChangeHandler}
                                  options={actualEngineTypes}/>
                    <SearchTextField value={machineryFilter.brand}
                                     label="Поиск по названию"
                                     name="brand"
                                     onChange={filterChangeHandler}/>
                </Stack>
            </AccordionDetails>
        </Accordion>

    );
};

export default MachineryFilters;