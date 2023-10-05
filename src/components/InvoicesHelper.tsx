import React from 'react';
import {Stack, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Grid from "@mui/material/Unstable_Grid2";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const InvoicesHelper = () => {
    return (
        <Grid container spacing={2} sx={{maxWidth: 1350, width: "100%", mt: 4}}>
            <Grid xs={6}>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <div style={{
                        height: "35px",
                        width: "35px",
                        backgroundColor: "white",
                        border: "1px solid black"
                    }}></div>
                    <Typography>- новые счета</Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
                    <div style={{height: "35px", width: "35px", backgroundColor: "#a0d2eb"}}></div>
                    <Typography>- счета , одобренные руководителем к оплате.</Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
                    <div style={{height: "35px", width: "35px", backgroundColor: "green"}}></div>
                    <Typography>- оплаченные счета.</Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
                    <div style={{height: "35px", width: "35px", backgroundColor: "pink"}}></div>
                    <Typography>- отменённые счета.</Typography>
                </Stack>
            </Grid>
            <Grid xs={6} spacing={1}>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <ContentCopyIcon color="action"/>
                    <Typography>- клик по данным с эти значком копирует их.</Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"center"} mt={2}>
                    <DownloadIcon/>
                    <Typography>- можно скачать файл счёта или платёжного поручения.</Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"center"} mt={2}>
                    <AttachFileIcon/>
                    <Typography>
                        - позволяет прикрепить файл платёжного поручения к неоплаченному счёту.
                        После чего счёт получит статус "оплачен"
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1} alignItems={"center"} mt={2}>
                    <MoreVertIcon color="action"/>
                    <Typography>
                        - в будующем позволит копировать номер счёта, отменить счёт, просмотреть тайминг счёта,
                        заменить файл плптёжного поручения
                    </Typography>
                </Stack>
            </Grid>
        </Grid>

    );
};

export default InvoicesHelper;