
export interface ITaskStatus {
    id: number, title: string,
}

export const taskStatus: ITaskStatus [] = [
    {id: 0, title: "Новая"},
    {id: 1, title: "В работе"},
    {id: 2, title: "Завершена"},
];

export interface ITaskPriority {
    id: number, title: string,
}

export const taskPriority: ITaskStatus [] = [
    {id: 0, title: "Не срочно и не важно"},
    {id: 1, title: "Срочно, но не важно"},
    {id: 2, title: "Не срочно, но важно"},
    {id: 3, title: "Срочно и важно"},
];

export interface INewTask {
    title: string;
    description: string;
    status_id: number;
    priority_id: number;
    due_date: number;
    author_id: number;
    assigned_to_id: number;
    machinery_id?: number;
    issue_photos: string[];
}

export interface ITask  extends  INewTask{
    id: number;
    created_date: number;
    updated_date: number;
    result_photos: string[];
    result_description: string;
    spent_resources: string[];
}