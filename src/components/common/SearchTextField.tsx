import React, {ChangeEvent, FC} from "react";
import {FormControl, SelectChangeEvent, SxProps, TextField, useMediaQuery} from "@mui/material";

interface IProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => void;
    sx?: SxProps;
}

const SearchTextField: FC<IProps> = ({ label, name, value, onChange, sx }) => {
    const matches_850 = useMediaQuery("(max-width:850px)");

    return (
        <FormControl
            sx={{
                minWidth: "170px",// Совпадает с Select
                flexGrow: 1,
                m: 1,         // Одинаковый внешний отступ
                ...sx,        // Возможность переопределить стили
            }}
        >
            <TextField
                id={name}
                name={name}
                label={label}
                variant="outlined"
                value={value}
                onChange={onChange}
                size={matches_850 ? "small" : "medium"} // Унифицированный размер

            />
        </FormControl>
    );
};

export default SearchTextField;