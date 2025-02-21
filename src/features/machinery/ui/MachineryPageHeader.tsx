import React from "react";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import {routes} from "../../../utils/routes";
import {Link} from "react-router-dom";

const MachineryPageHeader = () => {
    return (
        <Stack direction="row" spacing={3}>
            <Stack spacing={1} sx={{flex: "1 1 auto"}}>
                <Typography variant="h4">Техника</Typography>
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                    <Button color="inherit" sx={{fontSize: "var(--icon-fontSize-md)"}} startIcon={<UploadIcon/>}>
                        Import
                    </Button>
                    <Button color="inherit" sx={{fontSize: "var(--icon-fontSize-md)"}} startIcon={<DownloadIcon/>}>
                        Export
                    </Button>
                </Stack>
            </Stack>
            <div>
                <Button
                    component={Link}
                    to={routes.addNewMachinery}
                    startIcon={<AddIcon sx={{fontSize: "var(--icon-fontSize-md)"}}/>}
                    variant="contained"
                >
                    Добавить
                </Button>
            </div>
        </Stack>
    );
};

export default MachineryPageHeader;