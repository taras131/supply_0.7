import {MachineryStatus} from "utils/const";
import {IComment} from "./iComents";
import {ITask} from "./ITasks";

export type MachineryStatusType = typeof MachineryStatus[keyof typeof MachineryStatus];

export interface INewMachineryDoc {
    title: string;
    machinery_id: number;
}

export interface IMachineryDoc extends INewMachineryDoc {
    id: number;
    created_date: int;
    updated_date: int;
    file_name: string;
}

export interface INewMachinery {
    brand: string;
    model: string;
    year_manufacture: number;
    type_id: number;
    vin: string;
    state_number: string;
    status: MachineryStatusType;
}

export interface IMachinery extends INewMachinery {
    id: number;
    comments?: IComment[];
    photos: string[];
    created_date: number;
    updated_date: number;
}

export interface ICurrentMachinery extends IMachinery {
    docs: IMachineryDoc[];
    tasks: ITask[];
}
