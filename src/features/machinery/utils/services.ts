import {problemCategories, problemStatus} from "../../problems/utils/consts";


export const getCategoryTitleById = (id: number): string | undefined => {
    return problemCategories.find(category => category.id === id)?.title;
};

export const getStatusTitleById = (id: number): string | undefined => {
    return problemStatus.find(status => status.id === id)?.title;
};

