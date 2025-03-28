import React, {FC} from "react";
import {ITask} from "../../../models/ITasks";
import BaseTable from "../../../components/common/BaseTable";
import {ITableColumn} from "../../../models/ITable";
import {Chip, useMediaQuery} from "@mui/material";
import dayjs from "dayjs";
import {getDueDateColor} from "../utils/services";
import {useAppSelector} from "../../../hooks/redux";
import {selectMachineryTitles} from "../../machinery/model/selectors";
import {routes} from "../../../utils/routes";
import {useNavigate} from "react-router-dom";
import ProblemStatusIcon from "../../problems/ui/ProblemStatusIcon";

interface IProps {
    rows: ITask []
    machineryMode: boolean
}

const TasksMobileTable: FC<IProps> = ({rows, machineryMode}) => {
    const navigate = useNavigate();
    const machineryTitles = useAppSelector(selectMachineryTitles);
    const matches_530 = useMediaQuery("(max-width:530px)");
    const matches_460 = useMediaQuery("(max-width:460px)");
    const onTaskClick = (task: ITask) => {
        navigate(routes.machineryTaskDetails.replace(":taskId", task.id.toString()));
    };
    const columns: ITableColumn<ITask>[] = [
        {
            key: "status_id",
            label: "Статус",
            getValue: (row) => (<ProblemStatusIcon statusId={row.status_id}/>),
        },
        {
            key: "machinery_id",
            label:
                "Техника",
            isHidden:
            machineryMode,
            getValue: (row) => machineryTitles[row.machinery_id],
        },
        {
            key: "title",
            label: "Заголовок",
        },
        {
            key: "description",
            label: "Описание",
            isHidden: matches_460,
            getValue: (row) => matches_530 ? row.description.slice(0, 20) : row.description.slice(0, 200),
        },
        {
            key: "due_date",
            label: "Срок",
            getValue:
                (row) => (
                    <Chip
                        label={`${matches_530 ? "" : "до: "} ${row.due_date ? dayjs(row.due_date).format("DD.MM.YY").slice(0, 5) : "нет даты"}`}
                        color={getDueDateColor(row.due_date)}/>
                ),
        },
    ];
    return (
        <BaseTable
            rows={rows}
            columns={columns}
            onRowClick={onTaskClick}
            minWidth="400px"
        />
    );
};

export default TasksMobileTable;