import React, {FC} from "react";
import {DrawerMode} from "./ProblemDrawer";
import {Button, Stack} from "@mui/material";

interface IProps {
    mode: DrawerMode;
    onSave: () => void;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const ActionButtons: FC<IProps> = ({mode, onSave, onClose}) => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button onClick={onClose} variant="outlined">
                Назад
            </Button>
            {mode !== "view" && (
                <Button onClick={onSave} variant="contained" color="success">
                    Сохранить
                </Button>
            )}
        </Stack>
    );
};

export default ActionButtons;