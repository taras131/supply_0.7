import React, {FC} from "react";
import {IMachinery} from "../../../models/iMachinery";
import {IconButton, Stack, TableCell, TableRow} from "@mui/material";
import {styled} from "@mui/material/styles";
import photoPlaceholder from "../../../assets/images/placeholder.png";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {CENTER, ROW, SUCCESS} from "../../../styles/const";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY, VIN_COPY_TEXT} from "../../../utils/const";
import {useAppDispatch} from "../../../hooks/redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {filesPath} from "../../files/api";
import {machineryTypes} from "../utils/const";

const StyledImage = styled("img")({
    width: "100%",
    height: "70px",
    objectFit: "contain",
    backgroundColor: "white",
    borderRadius: "8px",
});

interface IProps {
    row: IMachinery;
}

const MachineryTableRow: FC<IProps> = ({row}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleMoreClick = () => {
        navigate(`${routes.machinery}/${row.id}`);
    };
    const handleVINClick = () => {
        navigator.clipboard.writeText(row.vin);
        dispatch(setMessage({text: VIN_COPY_TEXT, severity: MESSAGE_SEVERITY.success}));
    };
    const photoPath = row.photos[0] ? `${filesPath}/${row.photos[0]}` : photoPlaceholder;
    return (
        <TableRow hover>
            <TableCell sx={{padding: "5px 0"}}>
                <StyledImage src={photoPath} alt="machinery_photo"/>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle2">{row.brand}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="subtitle2">{row.model}</Typography>
            </TableCell>
            <TableCell>{row.year_manufacture}</TableCell>
            <TableCell>{row.state_number}</TableCell>
            <TableCell onClick={handleVINClick}>
                <Stack sx={{cursor: "pointer"}}
                       direction={ROW}
                       alignItems={CENTER}

                       spacing={1}>
                    <ContentCopyIcon color={SUCCESS}/>
                    {row.vin}
                </Stack>
            </TableCell>
            <TableCell>{machineryTypes.find(type => type.id === row.type_id)?.title || ""}</TableCell>
            <TableCell>
                <IconButton aria-label="show more" onClick={handleMoreClick} sx={{padding: 0}}>
                    <MoreVertIcon color={SUCCESS}/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default MachineryTableRow;