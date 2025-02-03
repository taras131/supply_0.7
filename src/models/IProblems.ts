export interface INewProblem {
    title: string;
    description: string;
    photos: string [];
    author_id: number;
    machinery_id: number;
    priority_id: number;
}
export interface IProblem extends INewProblem {
    id: number;
    created_date: number;
    updated_date: number;
    task_id?: number;
}