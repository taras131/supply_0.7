import React, {FC} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";

interface IProps {
    title: string
    value?: string | number
    children?: React.ReactNode
}

const NameWithValue: FC<IProps> = ({title, value, children}) => {
    return (
        <>
            <Grid container sx={{width: "100%"}} alignItems="center">
                <Grid xs={3}>
                    <Typography color="gray" fontWeight={600}>
                        {title}
                    </Typography>
                </Grid>
                <Grid xs={9}>
                    {value
                        ? (<Typography fontWeight={600}>
                            {value}
                        </Typography>)
                        : children}
                </Grid>
            </Grid>
            <Divider/>
        </>
    );
};

export default NameWithValue;