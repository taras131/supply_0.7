import {MachineryStatus} from "utils/const";
import {IComment} from "./iComents";
import {ITask} from "./ITasks";
import {IProblem} from "./IProblems";

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
    engine_type_id: number;
    vin: string;
    state_number: string;
    status: MachineryStatusType;
    photos: string[];
    traction_type_id: number;
    transmission_type_id: number;
    operating_type_id: number;
    working_equipment: string;
    engine_brand: string;
    engine_model: string;
    transmission_brand: string;
    transmission_model: string;
    frame_number: string;
}

export interface IMachinery extends INewMachinery {
    id: number;
    comments?: IComment[];
    created_date: number;
    updated_date: number;
}

export interface ICurrentMachinery extends IMachinery {
    docs: IMachineryDoc[];
    tasks: ITask[];
    problems: IProblem[];
}

export interface IDoc {
    docTitle: string
}
