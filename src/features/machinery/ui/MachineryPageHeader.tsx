import React, {ChangeEvent, FC} from "react";
import {SelectChangeEvent, Stack, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {routes} from "../../../utils/routes";
import {Link} from "react-router-dom";
import SearchTextField from "../../../components/common/SearchTextField";
import Card from "@mui/material/Card";
import FilterSelect from "../../../components/common/FilterSelect";
import {useAppSelector} from "../../../hooks/redux";
import {getActualMachineryTypes} from "../model/selectors";
import {machineryStatus, machineryTypes} from "../utils/const";

interface IProps {
    machineryFilter: {
        type_id: number,
        brand: string,
        engine_type_id: number,
        status: number,
    };
    filterChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => void;
}

const MachineryPageHeader: FC<IProps> = ({
                                             machineryFilter,
                                             filterChangeHandler,
                                         }) => {
    const matches_850 = useMediaQuery("(max-width:850px)");
    const actualMachineryTypes = useAppSelector(state => getActualMachineryTypes(state, machineryTypes));
    return (
        <Card>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Typography fontSize={matches_850 ? "1.5rem" : "2rem"} variant="h4">Техника</Typography>
                <Button
                    component={Link}
                    to={routes.addNewMachinery}
                    startIcon={<AddIcon sx={{fontSize: "var(--icon-fontSize-md)"}}/>}
                    variant="contained"
                >
                    Добавить
                </Button>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" mt={2} sx={{flexWrap: "wrap"}}>
                <SearchTextField value={machineryFilter.brand}
                                 label="Поиск по названию"
                                 name="brand"
                                 onChange={filterChangeHandler}/>
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
            </Stack>
        </Card>
    );
};

export default MachineryPageHeader;