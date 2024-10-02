import React, {FC} from "react";
import {IMachinery} from "../models/iMachinery";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import MachineryListTableHeader from "./MachineryListTableHeader";
import MachineryListItem from "./MachineryListItem";
import Typography from "@mui/material/Typography";

interface IProps {
    title?: string
    machinery: IMachinery[];
}

const MachineryList: FC<IProps> = ({title, machinery}) => {
    const machineryList = machinery.map((machinery) => <MachineryListItem key={machinery.id} machinery={machinery}/>);
    return (
        <>
            {title && (<Typography fontSize={"18px"} variant={"h3"}>{title} :</Typography>)}
            <TableContainer component={Paper} sx={{maxWidth: 1350, marginTop: "4px"}}>
                <Table aria-label="simple table">
                    <MachineryListTableHeader/>
                    <TableBody>{machineryList ? machineryList : ""}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default MachineryList;
