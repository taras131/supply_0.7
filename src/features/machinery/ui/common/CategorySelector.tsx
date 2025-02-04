import {ICategory, ISubCategory} from "../../../../models/IProblems";
import React, {FC, useEffect, useState} from "react";
import {FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Box from "@mui/material/Box";

interface IProps {
    categories: ICategory[];
    selectedCategoryId?: number;
    selectedSubCategoryId?: number;
    handleChange: (e: SelectChangeEvent) => void;
}

const CategorySelector: FC<IProps> = ({
                                          categories,
                                          selectedCategoryId,
                                          selectedSubCategoryId,
                                          handleChange,
                                      }) => {
    const [subCategories, setSubCategories] = useState<ISubCategory[] | null>([]);

    useEffect(() => {
        const selectedCategory = categories.find(category => category.id === selectedCategoryId) || null;
        setSubCategories(selectedCategory?.subcategories || []);

        // Если категория не выбрана, устанавливаем подкатегории в пустой массив для отображения сообщения
        if (!selectedCategoryId) {
            setSubCategories(null);
        }
    }, [selectedCategoryId, categories]);

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {/* Select для выбора категории */}
            <FormControl fullWidth>
                <Select
                    variant="outlined"
                    value={selectedCategoryId || ""}
                    onChange={handleChange}
                    displayEmpty
                    name="category_id"
                >
                    <MenuItem value="">
                        <em>Не выбрано</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Категория</FormHelperText>
            </FormControl>

            {/* Select для выбора подкатегории */}
            <FormControl fullWidth disabled={!selectedCategoryId}>
                <Select
                    variant="outlined"
                    name="subcategory_id"
                    value={selectedSubCategoryId || ""}
                    onChange={handleChange}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>Не выбрано</em>
                    </MenuItem>
                    {subCategories && subCategories.map(subCategory => (
                        <MenuItem key={subCategory.id} value={subCategory.id}>
                            {subCategory.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Подкатегория</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default CategorySelector;
