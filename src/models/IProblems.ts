export interface ISubCategory {
    id: number;
    name: string;
}

export interface ICategory {
    id: number;
    name: string;
    subcategories: ISubCategory[];
}

export interface INewProblem {
    title: string;
    description: string;
    photos: string [];
    author_id: number;
    machinery_id: number;
    priority_id: number;
    category_id: number;
    status_id: number;
    operating: number;
    odometer: number;
    task_id?: number;
}

export interface IProblem extends INewProblem {
    id: number;
    created_date: number;
    updated_date: number;

}

