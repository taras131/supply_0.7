
export interface ITaskStatus {
    id: number, title: string,
}

export interface ITaskPriority {
    id: number, title: string,
}

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
    category_id: number;
    problem_id: number;
    type_id: number;
    issue_operating: number;
    issue_odometer: number;
}

export interface ITask  extends  INewTask{
    id: number;
    created_date: number;
    updated_date: number;
    result_photos: string[];
    result_description: string;
    result_operating: number;
    result_odometer: number;
    spent_resources: string;
}