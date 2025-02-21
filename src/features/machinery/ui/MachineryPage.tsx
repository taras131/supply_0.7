import React from "react";
import {Stack} from "@mui/material";
import {useAppSelector} from "../../../hooks/redux";
import {getMachinery} from "../model/selectors";
import MachineryTable from "./MachineryTable";
import MachineryPageHeader from "./MachineryPageHeader";

const MachineryPage = () => {
    const machinery = useAppSelector(getMachinery);
    return (
        <Stack spacing={3} sx={{height: "100%"}}>
            <MachineryPageHeader/>
            {/* <CustomersFilters />*/}
            <MachineryTable rows={machinery}/>
        </Stack>
    );
};

export default MachineryPage;
