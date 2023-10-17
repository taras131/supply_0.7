import React, {FC} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {Typography} from "@mui/material";
import Divider from '@mui/material/Divider';

interface IProps {
    title: string
    value: string | number
}

const InvoiceDetailsItem: FC<IProps> = ({title, value}) => {
    return (
        <>
            <Grid container sx={{width: "100%"}} alignItems="center">
                <Grid xs={3}>
                    <Typography color="gray" fontWeight={600}>
                        {title}
                    </Typography>
                </Grid>
                <Grid xs={9}>
                    <Typography fontWeight={600}>
                        {value}
                    </Typography>
                </Grid>
            </Grid>
            <Divider/>
        </>
    );
};

export default InvoiceDetailsItem;