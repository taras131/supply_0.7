import {problemCategories} from "./const";

const categoryMap: Record<number, { id: number; name: string }>
    = problemCategories.reduce<Record<number, { id: number; name: string }>>(
    (acc, category) => {
        // Включаем саму категорию
        acc[category.id] = {id: category.id, name: category.name};

        // Включаем подкатегории
        category.subcategories.forEach((sub) => {
            acc[sub.id] = {id: sub.id, name: sub.name};
        });

        return acc;
    },
    {}
);

export const getCategoryNameById = (id: number): string | undefined => {
    return categoryMap[id]?.name;
};