
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

export interface ITaskItem {
    id: number, title: string, isComplete: boolean,
}


export interface INewTask {
    title: string;
    description: string;
    status_id: number
    priority_id: number
    due_date: number
    items: ITaskItem[]
    author_id: number
    assigned_to: number
}

export interface ITask  extends  INewTask{
    id: number;
    created_date: number;
    updated_date: number;
}