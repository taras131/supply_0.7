import React, {FC} from "react";
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import MachineryListTableHeader from "./MachineryListTableHeader";
import MachineryListItem from "./MachineryListItem";
import Typography from "@mui/material/Typography";
import { useAppSelector} from "../../../hooks/redux";
import {getMachineryByTypeId} from "../model/selectors";

interface IProps {
    type: any
}

const MachineryList: FC<IProps> = ({type}) => {
    const machinery = useAppSelector(state => getMachineryByTypeId(state, type.id));
    const machineryList = machinery.map((machinery) => <MachineryListItem key={machinery.id}
                                                                          machinery={machinery}/>);
    if(machineryList.length === 0) return null;
    return (
        <>
            <Typography fontSize={"18px"} variant={"h3"}>{type.title} :</Typography>
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
