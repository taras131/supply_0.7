import React, {FC} from 'react';
import {IProblem} from "../../../../models/IProblems";
import TitleWithValue from "../../../../components/TitleWithValue";
import {getCategoryNameById} from "../../utils/services";
import {convertMillisecondsToDate} from "../../../../utils/services";
import InformationDrawer, {IInformationItem} from "../../../../components/common/InformationDrawer";

interface IProps {
    problem: IProblem | null;
}

const ProblemView: FC<IProps> = ({problem}) => {
    if (!problem) {
        return null;
    }
    const information: IInformationItem [] = [
        {label: "Категория", value: getCategoryNameById(problem.category_id) || ""},
        {
            label: "Подкатегория", value:
                problem.subcategory_id
                    ? getCategoryNameById(problem.subcategory_id) || ""
                    : "не задана",
        },
        {label: "Заголовок", value: problem.title},
        {label: "Описание", value: problem.description},
        {label: "Статус", value: problem.task_id ? "Решается" : "Ожидает"},
        {label: "Дата создания", value: convertMillisecondsToDate(problem.created_date)},
        {label: "Дата редактирования", value: convertMillisecondsToDate(problem.updated_date)},
    ];
    return (
        <InformationDrawer items={information}/>
    );
};

export default ProblemView;