import React, {ChangeEvent, FC} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useMediaQuery} from "@mui/material";

interface IProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => void;
    options: Array<{ id: number | string; title: string | number }>;
}

const FilterSelect: FC<IProps> = ({
                                      label,
                                      name,
                                      value,
                                      options,
                                      onChange,
                                      sx,
                                  }) => {
    const matches_850 = useMediaQuery("(max-width:850px)");

    return (
        <FormControl
            sx={{
                minWidth: "170px", // Аналогичный минимальный размер
                flexGrow: 1,
                m: 1,          // Внешний отступ
                ...sx,         // Возможность переопределить стили
            }}
        >
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                id={name}
                name={name}
                value={value}
                label={label}
                onChange={onChange}
                variant="outlined"
                size={matches_850 ? "small" : "medium"}
                sx={{
                    width: "100%", // Поле занимает всю ширину контейнера
                }}
            >
                <MenuItem value={-1}>Не выбрано</MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterSelect;