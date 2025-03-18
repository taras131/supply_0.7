import React, {FC} from "react";
import {IProblem} from "../../../models/IProblems";
import {Chip, useMediaQuery} from "@mui/material";
import {convertMillisecondsToDate} from "../../../utils/services";
import {
    getCategoryTitleById,
    getPriorityChipColor,
    getPriorityTitleById,
} from "../../machinery/utils/services";
import {ITableColumn} from "../../../models/ITable";
import BaseTable from "../../../components/common/BaseTable";
import {useAppSelector} from "../../../hooks/redux";
import {getCurrentMachineryOperatingTypeId, selectMachineryTitles} from "../../machinery/model/selectors";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface IProps {
    rows: IProblem[] | null;
    onProblemClick: (problemId: number) => void;
    activeRowId: number | null;
    isMachineryMode: boolean;
}

const ProblemsTable: FC<IProps> = ({rows, onProblemClick, activeRowId, isMachineryMode}) => {
    const operatingTypeId = useAppSelector(getCurrentMachineryOperatingTypeId);
    const machineryTitles = useAppSelector(selectMachineryTitles);
    const matches_850 = useMediaQuery("(max-width:850px)");
    const matches_650 = useMediaQuery("(max-width:650px)");
    if (!rows) return null;
    const rowClickHandler = (problem: IProblem) => {
        onProblemClick(problem.id);
    };
    const columns: ITableColumn<IProblem>[] = [
        {
            key: "status_id",
            label: "Статус",
            getValue: (row) => (
                <Box display="flex" alignItems="center" justifyContent="center">
                    {row.status_id === 1 && <HourglassBottomIcon color="error"/>}
                    {row.status_id === 2 && <AssignmentIcon color="warning"/>}
                    {row.status_id === 3 && <BuildIcon color="primary"/>}
                    {row.status_id === 4 && <CheckCircleIcon color="success"/>}
                </Box>
            ),
        },
        {
            key: "created_date",
            label: "Дата",
            isHidden: matches_850,
            getValue: (row) => row.created_date,
            formatter: (value) => convertMillisecondsToDate(value),
        },
        {
            key: "machinery_id",
            label: "Техника",
            isHidden: isMachineryMode,
            getValue: (row) => machineryTitles[row.machinery_id],
        },
        {
            key: "operating",
            label: operatingTypeId === 0 ? "Наработка (часы)" : "Пробег (км)",
        },
        {
            key: "category_id",
            label: "Категория",
            isHidden: matches_650,
            getValue: (row) => getCategoryTitleById(row.category_id),
        },
        {
            key: "title",
            label: "Заголовок",
        },
        {
            key: "description",
            label: "Описание",
            isHidden: matches_850,
        },
        {
            key: "priority_id",
            label: matches_650 ? " " : "Приоритет",
            getValue: (row) => {
                const priorityColor = getPriorityChipColor(row.priority_id);
                const label = getPriorityTitleById(row.priority_id) || " ";
                return (
                    <Chip
                        label={matches_650 ? label[0] : label}
                        color={priorityColor}
                    />
                );
            },
        },
    ];

    return (
        <BaseTable
            rows={rows}
            columns={columns}
            onRowClick={rowClickHandler}
            activeRowId={activeRowId}
            minWidth="400px"
        />
    );
};

export default ProblemsTable;