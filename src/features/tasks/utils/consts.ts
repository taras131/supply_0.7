import {INewTask, ITask, ITaskPriority, ITaskStatus} from "../../../models/ITasks";

export const taskPriority: ITaskPriority [] = [
    {id: 1, title: "Не срочно и не важно"},
    {id: 2, title: "Срочно, но не важно"},
    {id: 3, title: "Не срочно, но важно"},
    {id: 4, title: "Срочно и важно"},
];

export const taskStatus: ITaskStatus [] = [
    {id: 1, title: "Новая"},
    {id: 2, title: "В работе"},
    {id: 3, title: "Завершена"},
];
export const taskTypes: ITaskStatus [] = [
    {id: 1, title: "Тех обслуживание"},
    {id: 2, title: "Ремонт"},
];

export const emptyTask: INewTask = {
    title: "",
    description: "",
    status_id: 1,
    priority_id: -1,
    due_date: 0,
    author_id: -1,
    assigned_to_id: -1,
    machinery_id: -1,
    issue_photos: [],
    category_id: -1,
    problem_id: -1,
    type_id: -1,
    issue_operating: 0,
    issue_odometer: 0,
};

export const defaultTask: ITask = {
    title: "",
    description: "",
    status_id: 1,
    priority_id: -1,
    due_date: 0,
    author_id: -1,
    assigned_to_id: -1,
    machinery_id: -1,
    issue_photos: [],
    category_id: -1,
    problem_id: -1,
    type_id: -1,
    issue_operating: 0,
    issue_odometer: 0,
    id: 0,
    created_date: 0,
    updated_date: 0,
    result_photos: [],
    result_description: "",
    result_operating: 0,
    result_odometer: 0,
    spent_resources: "",
};