import React, {FC} from "react";
import {IProblem} from "../../../models/IProblems";
import {useMediaQuery} from "@mui/material";
import {convertMillisecondsToDate} from "../../../utils/services";
import {getCategoryTitleById} from "../../machinery/utils/services";
import {ITableColumn} from "../../../models/ITable";
import BaseTable from "../../../components/common/BaseTable";
import {useAppSelector} from "../../../hooks/redux";
import {getCurrentMachineryOperatingTypeId, selectMachineryTitles} from "../../machinery/model/selectors";
import ProblemPriorityChip from "./ProblemPriorityChip";
import ProblemStatusIcon from "./ProblemStatusIcon";

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
    const matches_440 = useMediaQuery("(max-width:440px)");
    if (!rows) return null;
    const rowClickHandler = (problem: IProblem) => {
        onProblemClick(problem.id);
    };
    const columns: ITableColumn<IProblem>[] = [
        {
            key: "status_id",
            label: "Статус",
            getValue: (row) => (<ProblemStatusIcon statusId={row.status_id}/>),
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
            isHidden: matches_440,
            getValue: (row) => (<ProblemPriorityChip priorityId={row.priority_id}/>),
        },
    ];

    return (
        <BaseTable
            rows={rows}
            columns={columns}
            onRowClick={rowClickHandler}
            activeRowId={activeRowId}
            minWidth="380px"
        />
    );
};

export default ProblemsTable;