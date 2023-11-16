import {RootState} from "../index";

export const getMachinery = (state: RootState) => {
    return state.machinery.list;
};