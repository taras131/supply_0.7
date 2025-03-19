import {INewProblem, IProblem} from "../../../models/IProblems";

export const emptyProblem: INewProblem = {
    title: "",
    description: "",
    photos: [],
    author_id: 0,
    machinery_id: -1,
    priority_id: 2,
    category_id: -1,
    operating: 0,
    odometer: 0,
    status_id: 1,
    tasks_id: [],
};

export const defaultProblem: IProblem = {
    ...emptyProblem,
    id: 0,
    created_date: 0,
    updated_date: 0,
};

export const problemStatus = [
    {id: 1, title: "Ожидает"},
    {id: 2, title: "Задача создана"},
    {id: 3, title: "Задача в работе"},
    {id: 4, title: "Решена"},
];

export const problemPriority = [
    {id: 1, title: "Ждёт"},
    {id: 2, title: "Важно"},
    {id: 3, title: "Критично"},
];

export const problemCategories = [
    {id: 1, title: "Силовая установка"},
    {id: 2, title: "Система трансмиссии"},
    {id: 3, title: "Подвеска и ходовая часть"},
    {id: 4, title: "Тормозная система"},
    {id: 5, title: "Рулевое управление"},
    {id: 6, title: "Электрооборудование"},
    {id: 7, title: "Климатическая система"},
    {id: 8, title: "Система безопасности"},
    {id: 9, title: "Кузов и внешний вид"},
    {id: 10, title: "Вспомогательные и дополнительные системы"},
    {id: 11, title: "Системы управления двигателем"},
];