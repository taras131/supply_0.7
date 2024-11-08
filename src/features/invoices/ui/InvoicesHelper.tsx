import React from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Grid from "@mui/material/Unstable_Grid2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { APPROVED_GRADIENT, CANCEL_GRADIENT, SUCCESS_GRADIENT } from "styles/const";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const InvoicesHelper = () => {
  const matches_700 = useMediaQuery("(min-width:700px)");
  return (
    <Grid container spacing={matches_700 ? 2 : 1} sx={{ maxWidth: 1350, width: "100%" }}>
      <Grid xs={matches_700 ? 6 : 12}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <div
            style={{
              height: "35px",
              width: "35px",
              backgroundColor: "white",
              border: "1px solid black",
            }}
          ></div>
          <Typography>- новые счета</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
          <div style={{ height: "35px", width: "35px", background: APPROVED_GRADIENT }}></div>
          <Typography>- счета , одобренные к оплате.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
          <div style={{ height: "35px", width: "35px", background: SUCCESS_GRADIENT }}></div>
          <Typography>- оплаченные счета.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"} mt={1}>
          <div style={{ height: "35px", width: "35px", background: CANCEL_GRADIENT }}></div>
          <Typography>- отменённые счета.</Typography>
        </Stack>
      </Grid>
      <Grid xs={matches_700 ? 6 : 12}>
        <Stack direction={"row"} spacing={3} alignItems={"center"}>
          <ContentCopyIcon color="action" />
          <Typography>- клик по данным с эти значком копирует их.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={3} alignItems={"center"} mt={matches_700 ? 2 : 1}>
          <DownloadIcon />
          <Typography>- скачать файл счёта или платёжного поручения.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={3} alignItems={"center"} mt={matches_700 ? 2 : 1}>
          <AttachFileIcon />
          <Typography>- прикрепить файл платёжного поручения.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={3} alignItems={"center"} mt={matches_700 ? 2 : 1}>
          <MoreVertIcon color="action" />
          <Typography>- получить более подробную информацию.</Typography>
        </Stack>
        <Stack direction={"row"} spacing={3} alignItems={"center"} mt={matches_700 ? 2 : 1}>
          <LocalShippingIcon color="action" />
          <Typography>- счёт отгружен.</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default InvoicesHelper;
