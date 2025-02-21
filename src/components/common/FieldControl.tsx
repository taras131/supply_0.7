import {ChangeEvent, FC} from "react";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";

const StyledInput = styled(TextField)(({theme}) => ({
    "label + &": {
        marginTop: theme.spacing(2),
    },
    "& .MuiInputBase-input": {
        borderRadius: 4,
        position: "relative",
        backgroundColor: "#F3F6F9",
        border: "1px solid",
        borderColor: "#E0E3E7",
        fontSize: 16,
        padding: "10px 12px",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        ...theme.applyStyles("dark", {
            backgroundColor: "#1A2027",
            borderColor: "#2D3843",
        }),
    },
}));

const StyledSelect = styled(Select)(({theme}) => ({
    "label + &": {
        marginTop: theme.spacing(2),
    },
    "& .MuiInputBase-input": {
        borderRadius: 4,
        position: "relative",
        backgroundColor: "#F3F6F9",
        border: "1px solid",
        borderColor: "#E0E3E7",
        fontSize: 16,
        padding: "10px 12px",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        ...theme.applyStyles("dark", {
            backgroundColor: "#1A2027",
            borderColor: "#2D3843",
        }),
    },
}));

const StyledTypography = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(1.7),
    fontWeight: 600,
}));

const StyledLabel = styled(InputLabel)(() => ({
    fontSize: "16px",
}));

interface IProps {
    label: string;
    name: string;
    id: string;
    value: string | number;
    isEditMode: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void;
    options?: Array<{ id: number | string; title: string | number }>;
    isRequired?: boolean;
}

const FieldControl: FC<IProps> = ({
                                                 label, name, id, value, isEditMode, onChange, options, isRequired = false,
                                             }) => (
    <FormControl fullWidth>
        <StyledLabel required={isRequired} shrink htmlFor={id}>
            {label}
        </StyledLabel>
        {isEditMode ? (
            options ? (
                <StyledSelect
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    sx={{ overflow: "hidden" }}
                    name={name}
                    id={id}
                >
                    <MenuItem value={-1}>Не выбрано</MenuItem>
                    {options.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.title}
                        </MenuItem>
                    ))}
                </StyledSelect>
            ) : (
                <StyledInput
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    name={name}
                    id={id}
                />
            )
        ) : (
            <StyledTypography>
                {options
                    ? options.find(option => option.id === value)?.title || "-------"
                    : value || "-------"}
            </StyledTypography>
        )}
        <FormHelperText />
    </FormControl>
);

export default FieldControl;