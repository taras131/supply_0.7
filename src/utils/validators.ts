import {ICurrentMachinery, IDoc, INewMachinery} from "../models/iMachinery";
import {INewProblem, IProblem} from "../models/IProblems";
import {INewTask} from "../models/ITasks";

export type ValidationErrors = { [key: string]: string | null };

export const machineryValidate = (machinery: ICurrentMachinery | INewMachinery) => {
    const errors: ValidationErrors = {};
    if(machinery) {
        if (machinery.brand.trim().length < 2) errors.brand = "Марка должена быть не менее 2 символов";
        if (!machinery.brand) errors.brand = "Марка обязателена для заполнения";
        if (machinery.brand.trim().length > 32) errors.brand = "Марка должена быть длиннее 32 символов";
        if (machinery.model.trim().length < 2) errors.model = "Модель должна быть не менее 2 символов";
        if (!machinery.model) errors.model = "Модель обязательна для заполнения";
        if (machinery.model.trim().length > 32) errors.model = "Модель должна быть не длиннее 32 символов";
        if (machinery.type_id < 0) errors.type_id = "Выберите тип техники";
        if (machinery.engine_type_id < 0) errors.engine_type_id = "Выберите тип двигателя";
        if (machinery.year_manufacture < 0) errors.year_manufacture = "Выберите год производства";
        if (machinery.operating_type_id < 0) errors.operating_type_id = "Выберите еденицы измерения";
        if (machinery.vin.trim().length > 32) errors.vin = "VIN должен быть не длиннее 32 символов";
        if (machinery.state_number.trim().length > 32) errors.state_number = "Гос. номер должен быть не длиннее 32 символов";
        if (machinery.working_equipment.trim().length > 32) errors.working_equipment = "Поле должно быть не длиннее 32 символов";
        if (machinery.frame_number?.trim().length > 32) errors.frame_number = "Поле должно быть не длиннее 32 символов";
        if (machinery.engine_brand.trim().length > 32) errors.engine_brand = "Марка двигателя должна быть не длиннее 32 символов";
        if (machinery.engine_model.trim().length > 32) errors.engine_model = "Модель двигателя должна быть не длиннее 32 символов";
        if (machinery.transmission_brand.trim().length > 32) errors.transmission_brand = "Марка трансмиссии должна быть не длиннее 32 символов";
        if (machinery.transmission_model.trim().length > 32) errors.transmission_model = "Модель трансмиссии должна быть не длиннее 32 символов";
    }
    return errors;
};

export const docValidate = (doc: IDoc) => {
    const errors: ValidationErrors = {};
    if(doc.docTitle.length < 3) errors.docTitle = "Название должно быть не менее 2 символов";
    if(doc.docTitle.length > 32) errors.docTitle = "Название должно быть не длиннее 32 символов";
    return errors;
};

export const problemValidate = (problem: IProblem | INewProblem) => {
    const errors: ValidationErrors = {};
    if (problem.category_id < 0) errors.category_id = "Выберите категорию";
    if(+problem.operating === 0 && +problem.odometer === 0 ) {
        errors.operating = "Заполните км или часы";
        errors.odometer = "Заполните км или часы";
    }
    if(problem.operating > 1000000000) errors.operating = "Слишком большое значение";
    if(problem.odometer > 1000000000) errors.odometer = "Слишком большое значение";
    if(problem.title.length < 3) errors.title = "Не менее 3 символов";
    if(problem.title.length === 0) errors.title = "Заголовок должен быть";
    if(problem.title.length > 32) errors.title = "Не более 32 символов";
    if(problem.description.length === 0) errors.description = "Описание должно быть";
    if(problem.description.length < 3) errors.description = "Описание должно быть не менее 2 символов";
    if(problem.description.length > 400) errors.description = "Описание должно быть не длиннее 400 символов";
    return errors;
};

export const newTaskValidate = (task: INewTask) => {
    const errors: ValidationErrors = {};
    if(task.title.length < 3) errors.title = "Не менее 3 символов";
    if(task.title.length === 0) errors.title = "Заголовок должен быть";
    if(task.title.length > 32) errors.title = "Не более 32 символов";
    if(task.description.length === 0) errors.description = "Описание должно быть";
    if(task.description.length < 3) errors.description = "Описание должно быть не менее 2 символов";
    if(task.description.length > 400) errors.description = "Описание должно быть не длиннее 400 символов";
    return errors;
};

export const taskValidate = (task: INewTask) => {
    const errors: ValidationErrors = {};
    if(task.title.length < 3) errors.title = "Не менее 3 символов";
    if(task.title.length === 0) errors.title = "Заголовок должен быть";
    if(task.title.length > 32) errors.title = "Не более 32 символов";
    if(task.description.length === 0) errors.description = "Описание должно быть";
    if(task.description.length < 3) errors.description = "Описание должно быть не менее 2 символов";
    if(task.description.length > 400) errors.description = "Описание должно быть не длиннее 400 символов";
    return errors;
};