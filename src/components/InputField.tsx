import React from "react";
import {TextField} from "@mui/material";

export const InputField = React.memo(({label, value, onChange, error, helperText}: any) => (
    <TextField
        onChange={onChange}
        value={value}
        fullWidth
        label={label}
        error={!!error}
        helperText={helperText}
    />
));