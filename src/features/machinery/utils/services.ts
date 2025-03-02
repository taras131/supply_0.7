import {problemCategories, problemPriority, problemStatus} from "./const";

export const getCategoryTitleById = (id: number): string | undefined => {
    return problemCategories.find(category => category.id === id)?.title;
};

export const getStatusTitleById = (id: number): string | undefined => {
    return problemStatus.find(status => status.id === id)?.title;
};

export const getPriorityTitleById = (id: number): string | undefined => {
    return problemPriority.find(status => status.id === id)?.title;
};

export const getPriorityChipColor = (priorityId: number): "primary" | "error" | "warning" => {
    switch (priorityId) {
        case 1: // Критично
            return "primary";
        case 2: // Важно
            return "warning";
        case 3: // Ждёт
            return "error";
        default: // Подстраховка от некорректных данных
            return "warning";
    }
};