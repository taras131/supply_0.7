import React, {FC} from "react";
import {Button, Stack} from "@mui/material";

interface IProps {
    isEditMode: boolean;
    disabled: boolean;
    toggleIsEditMode: () => void;
    saveClickHandler: () => void;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const ActionsEditButtons: FC<IProps> = ({
                                            isEditMode,
                                            disabled,
                                            toggleIsEditMode,
                                            saveClickHandler,
                                            onClose,
                                        }) => {
    return (
        <Stack direction="row" sx={{width: "100%"}} alignItems="center" justifyContent="end" spacing={2}>
            {isEditMode
                ? (<>
                    <Button onClick={toggleIsEditMode} variant="outlined">
                        Отменить
                    </Button>
                    <Button onClick={saveClickHandler}
                            variant="contained"
                            color="success"
                            disabled={disabled}>
                        Сохранить
                    </Button>
                </>)
                : (<>
                    <Button variant="outlined" onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button variant="contained" onClick={toggleIsEditMode}>
                        Редактировать
                    </Button>
                </>)}
        </Stack>
    );
};

export default ActionsEditButtons;