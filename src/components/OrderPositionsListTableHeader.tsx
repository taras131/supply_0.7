import React, {FC} from "react";
import {TableHead, TableRow} from "@mui/material";
import {CENTER, StyledTableCell} from "../styles/const";

interface IProps {
    isLimitedOverview: boolean
}

const OrderPositionsListTableHeader:FC<IProps> = ({isLimitedOverview}) => {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell>№</StyledTableCell>
                <StyledTableCell>Наименование</StyledTableCell>
                <StyledTableCell>Каталожный номер</StyledTableCell>
                <StyledTableCell>Количество</StyledTableCell>
                {!isLimitedOverview && (
                    <StyledTableCell align={CENTER}>Комментарий</StyledTableCell>
                )}
                <StyledTableCell align={CENTER}>Поставщик</StyledTableCell>
            </TableRow>
        </TableHead>
    );
};

export default OrderPositionsListTableHeader;