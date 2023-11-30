import React, {FC} from 'react';
import {IMachinery} from "../models/iMachinery";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import MachineryListTableHeader from "./MachineryListTableHeader";
import MachineryListItem from "./MachineryListItem";

interface IProps {
    machinery: IMachinery[]
}

const MachineryList: FC<IProps> = ({machinery}) => {
    const machineryList = machinery.map(machinery => (<MachineryListItem key={machinery.id} machinery={machinery}/>))
    return (
        <TableContainer component={Paper} sx={{maxWidth: 1350, marginTop: "4px"}}>
            <Table aria-label="simple table">
                <MachineryListTableHeader/>
                <TableBody>
                    {machineryList ? machineryList : ""}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MachineryList;