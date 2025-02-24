import {ICurrentMachinery, INewMachinery} from "../models/iMachinery";

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
        if (machinery.vin.trim().length > 32) errors.vin = "VIN должен быть не длиннее 32 символов";
        if (machinery.state_number.trim().length > 32) errors.state_number = "Гос. номер должен быть не длиннее 32 символов";
        if (machinery.working_equipment.trim().length > 32) errors.working_equipment = "Поле должно быть не длиннее 32 символов";
        if (machinery.engine_brand.trim().length > 32) errors.engine_brand = "Марка двигателя должна быть не длиннее 32 символов";
        if (machinery.engine_model.trim().length > 32) errors.engine_model = "Модель двигателя должна быть не длиннее 32 символов";
        if (machinery.transmission_brand.trim().length > 32) errors.transmission_brand = "Марка трансмиссии должна быть не длиннее 32 символов";
        if (machinery.transmission_model.trim().length > 32) errors.transmission_model = "Модель трансмиссии должна быть не длиннее 32 символов";
    }
    return errors;
};