import {RootState} from "../index";
import {IMachinery} from "../../models/iMachinery";

const collator = new Intl.Collator("ru");

export const getMachinery = (state: RootState): IMachinery [] => {
    const arr = [...state.machinery.list];
    return arr.sort((a, b) => {
        const nameA = a.brand.toLowerCase();
        const nameB = b.brand.toLowerCase();
        return collator.compare(nameA, nameB);
    });
};
export const getMachineryById = (state: RootState, machineryId: string): IMachinery [] => {
   return state.machinery.list.filter(machinery => machinery.id === machineryId)
};