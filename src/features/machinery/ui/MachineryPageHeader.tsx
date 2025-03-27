import React from "react";
import {Stack, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {routes} from "../../../utils/routes";
import {Link} from "react-router-dom";

const MachineryPageHeader = () => {
    const matches_850 = useMediaQuery("(max-width:850px)");
    return (
        <Stack direction="row" spacing={3}>
            <Stack spacing={1} sx={{flex: "1 1 auto"}}>
                <Typography fontSize={matches_850 ? "1.5rem" : "2rem"}  variant="h4">Техника</Typography>
            </Stack>
            <div>
                <Button
                    component={Link}
                    to={routes.addNewMachinery}
                    startIcon={<AddIcon sx={{fontSize: "var(--icon-fontSize-md)"}}/>}
                    variant="contained"
                    size={matches_850 ? "small" : "medium"}
                >
                    Добавить
                </Button>
            </div>
        </Stack>
    );
};

export default MachineryPageHeader;