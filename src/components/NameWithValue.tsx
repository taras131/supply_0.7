import React, {FC} from "react";
import {Stack, Typography} from "@mui/material";
import {ROW, SPACE_BETWEEN} from "../styles/const";

interface IProps {
    title: string
    value?: string | number
    children?: React.ReactNode
}

const NameWithValue: FC<IProps> = ({title, value, children}) => {
    return (
        <Stack sx={{width: "100%", height: "50px"}} direction={ROW} alignItems="center" justifyContent={SPACE_BETWEEN}>
            <Typography color="gray" fontWeight={600}>
                {title}
            </Typography>
            {value
                ? (<Typography fontWeight={600}>
                    {value}
                </Typography>)
                : children}
        </Stack>
    );
};

export default NameWithValue;