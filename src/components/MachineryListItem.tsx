import React, {FC} from 'react';
import {IMachinery} from "../models/iMachinery";
import {Chip, IconButton, Stack, TableCell, TableRow, Tooltip, Typography, useMediaQuery} from "@mui/material";
import {
    CENTER,
    END,
    INHERIT,
    LEFT,
    RIGHT,
    ROW,
    SPACE_BETWEEN,
    SUCCESS,
    StyledTableCell,
    StyledTableRow,
} from "../styles/const";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {MESSAGE_SEVERITY, VIN_COPY_TEXT} from "../utils/const";
import {setMessage} from "../store/reducers/message";
import {useAppDispatch} from "../hooks/redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {routes} from "../utils/routes";
import {useNavigate} from "react-router-dom";

interface IProps {
    machinery: IMachinery
}

const MachineryListItem: FC<IProps> = ({machinery}) => {
    const matches_1050 = useMediaQuery("(min-width:1050px)");
    const matches_700 = useMediaQuery("(min-width:700px)");
    const navigate = useNavigate();
    const matches_600 = useMediaQuery("(min-width:600px)");
    const matches_500 = useMediaQuery("(min-width:500px)");
    const matches_450 = useMediaQuery("(min-width:450px)");
    const matches_400 = useMediaQuery("(min-width:400px)");
    const dispatch = useAppDispatch();
    const handleVINClick = () => {
        navigator.clipboard.writeText(machinery.vin);
        dispatch(setMessage({text: VIN_COPY_TEXT, severity: MESSAGE_SEVERITY.success}));
    };
    const handleMoreClick = () => {
        navigate(`${routes.machinery}/${machinery.id}`);
    };
    return (
        <StyledTableRow sx={{width: "100%"}}>
            <StyledTableCell component="th" scope="row"
                             sx={{padding: matches_700 ? "8px" : "4px"}} align={LEFT}>
                {machinery.brand}
            </StyledTableCell>
            <StyledTableCell sx={{padding: matches_700 ? "8px" : "1px"}} align={LEFT}>
                {machinery.model}
            </StyledTableCell>
            <StyledTableCell sx={{padding: matches_700 ? "8px" : "1px", maxWidth: "130px"}} align={CENTER}
                             onClick={handleVINClick}>
                <Stack direction={ROW} alignItems={CENTER} justifyContent={SPACE_BETWEEN} spacing={1}
                       sx={{width: "100%"}}>
                    {machinery.vin}
                    {matches_1050 && (
                        <ContentCopyIcon color={SUCCESS}/>
                    )}
                </Stack>
            </StyledTableCell>
            {matches_500 && (
                <StyledTableCell sx={{padding: matches_700 ? "8px" : "1px"}} align={CENTER}>
                    {machinery.yearManufacture}
                </StyledTableCell>
            )}
            {matches_450 && (
                <StyledTableCell sx={{padding: matches_700 ? "8px" : "1px"}} align={CENTER}>
                    {matches_600 ? machinery.stateNumber : machinery.stateNumber.slice(1, 4)}
                </StyledTableCell>
            )}
            {matches_700 && (
                <StyledTableCell sx={{padding: matches_700 ? "8px" : "1px"}} align={CENTER}>
                    {machinery.type}
                </StyledTableCell>
            )}
            <StyledTableCell sx={{padding: matches_700 ? "8px" : 0}} align={CENTER}>
                <IconButton aria-label="show more" onClick={handleMoreClick} sx={{padding: 0}}>
                    <MoreVertIcon color={SUCCESS}/>
                </IconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default MachineryListItem;