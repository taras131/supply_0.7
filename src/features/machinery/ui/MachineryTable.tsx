import React, {FC} from "react";
import {IMachinery} from "../../../models/iMachinery";
import {Stack, useMediaQuery} from "@mui/material";
import {ITableColumn} from "../../../models/ITable";
import {filesPath} from "../../files/api";
import photoPlaceholder from "../../../assets/images/placeholder.png";
import BaseTable from "../../../components/common/BaseTable";
import {engineTypes, machineryTypes} from "../utils/const";
import {styled} from "@mui/material/styles";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {setMessage} from "../../../store/reducers/message";
import {MESSAGE_SEVERITY, VIN_COPY_TEXT} from "../../../utils/const";
import {useAppDispatch} from "../../../hooks/redux";
import MachineryStatusChip from "./MachineryStatusChip";

const StyledImage = styled("img")({
    width: "100%",
    height: "70px",
    objectFit: "contain",
    backgroundColor: "inherit",
    borderRadius: "8px",
});

interface IProps {
    rows?: IMachinery[];
}

const MachineryTable: FC<IProps> = ({rows = []}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const matches_1150 = useMediaQuery("(max-width:1150px)");
    const matches_1000 = useMediaQuery("(max-width:1000px)");
    const matches_850 = useMediaQuery("(max-width:850px)");
    const matches_650 = useMediaQuery("(max-width:650px)");
    const rowClickHandler = (row: IMachinery) => {
        navigate(`${routes.machinery}/list/${row.id}`);
    };
    const columns: ITableColumn<IMachinery>[] = [
        {
            key: "photo",
            label: "Фото",
            isHidden: matches_650,
            getValue: (row) => {
                const photoPath = row.photos[0] ? `${filesPath}/${row.photos[0]}` : photoPlaceholder;
                return (
                    <StyledImage src={photoPath} alt="machinery_photo"/>
                );
            },
        },
        {
            key: "brand",
            label: "Марка",
        },
        {
            key: "model",
            label: "Модель",
        },
        {
            key: "type_id",
            label: "Категория",
            isHidden: matches_1150,
            getValue: (row) => machineryTypes.find(type => type.id === row.type_id)?.title || "",
        },
        {
            key: "year_manufacture",
            label: "Г.в.",
        },
        {
            key: "engine_type_id",
            label: "Тип двигателя",
            isHidden: matches_1150,
            getValue: (row) => engineTypes.find(type => type.id === row.engine_type_id)?.title || "",
        },
        {
            key: "state_number",
            label: "Гос. номер",
            isHidden: matches_850,
        },
        {
            key: "vin",
            label: "VIN",
            isHidden: matches_1000,
            getValue: (row) => {
                const handleVINClick = (e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigator.clipboard.writeText(row.vin);
                    dispatch(setMessage({text: VIN_COPY_TEXT, severity: MESSAGE_SEVERITY.success}));
                };
                return (
                    <Stack sx={{cursor: "pointer"}}
                           onClick={handleVINClick}
                           direction="row"
                           alignItems="center"
                           spacing={1}>
                        <ContentCopyIcon color="info"/>
                        {row.vin}
                    </Stack>
                );
            },
        },
        {
            key: "status",
            label: matches_650 ? " " : "Статус",
            getValue: row => (<MachineryStatusChip status={row.status}/>),
        },
    ];
    return (
        <BaseTable
            rows={rows}
            columns={columns}
            onRowClick={rowClickHandler}
            minWidth="390px"
        />

    );
};

export default MachineryTable;