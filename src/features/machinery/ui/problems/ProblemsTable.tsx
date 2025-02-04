import React, {FC} from "react";
import {IProblem} from "../../../../models/IProblems";
import {IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {SUCCESS} from "../../../../styles/const";
import {convertMillisecondsToDate} from "../../../../utils/services";
import {getCategoryNameById} from "../../utils/services";
import {ITableColumn} from "../../../../models/ITable";
import BaseTable from "../../../../components/common/BaseTable";

interface IProps {
    rows: IProblem[];
    onProblemClick: (problem: IProblem) => void;
}

const ProblemsTable: FC<IProps> = ({rows, onProblemClick}) => {
    const columns: ITableColumn<IProblem>[] = [
        {
            key: "created_date",
            label: "Дата",
            getValue: (row) => row.created_date,
            formatter: (value) => convertMillisecondsToDate(value),
        },
        {
            key: "title",
            label: "Заголовок",
        },
        {
            key: "description",
            label: "Описание",
        },
        {
            key: "category_id",
            label: "Категория",
            getValue: (row) => getCategoryNameById(row.category_id),
        },
        {
            key: "subcategory_id",
            label: "Подкатегория",
            getValue: (row) =>
                row.subcategory_id ? getCategoryNameById(row.subcategory_id) : "Нет",
        },
        {
            key: "task_id",
            label: "Статус",
            getValue: (row) => row.task_id || "Ожидает",
        },
        {
            key: "actions",
            label: "Ещё",
            width: "50px",
            getValue: (row: IProblem) => ( // Явно указываем тип row
                <IconButton
                    aria-label="show more"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onProblemClick(row);
                    }}
                    sx={{ padding: 0 }}
                >
                    <MoreVertIcon color={SUCCESS} />
                </IconButton>
            ),
        },
    ];

    return (
        <BaseTable
            rows={rows}
            columns={columns}
        />
    );
};

export default ProblemsTable;