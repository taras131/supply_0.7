import React, {FC} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Stack, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {ROW, SPACE_BETWEEN} from "../styles/const";
import Box from "@mui/material/Box";

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