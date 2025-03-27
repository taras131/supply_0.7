import React, {FC} from "react";
import {Stack, useMediaQuery} from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import {useAppSelector} from "../../../../hooks/redux";
import {getMachineryIsLoading} from "../../model/selectors";
import {IMachinery} from "../../../../models/iMachinery";

interface IProps {
    isEditMode: boolean;
    isValid: boolean;
    toggleIsEditMode: () => void;
    updateMachineryHandler: () => void;
    cancelUpdateMachineryHandler: () => void;
}

const MachineryReportActionButtons: FC<IProps> = ({
                                                      isEditMode,
                                                      isValid,
                                                      toggleIsEditMode,
                                                      updateMachineryHandler,
                                                      cancelUpdateMachineryHandler,
                                                  }) => {
    const isLoading = useAppSelector(getMachineryIsLoading);
    const matches_850 = useMediaQuery("(max-width:850px)");
    return (
        <Stack direction="row" sx={{width: "100%"}} alignItems="center" justifyContent="end" spacing={2}>
            {isEditMode
                ? (<>
                    <Button onClick={cancelUpdateMachineryHandler}
                            variant={"outlined"}>
                        Отменить
                    </Button>
                    <LoadingButton onClick={updateMachineryHandler}
                                   variant={"contained"}
                                   loading={isLoading}
                                   disabled={!isValid}
                                   color={"success"}>
                        Сохранить
                    </LoadingButton>
                </>)
                : (<LoadingButton onClick={toggleIsEditMode}
                                  variant={"contained"}
                                  loading={isLoading}
                                  color="primary"
                                  size={matches_850 ? "small" : "medium"}>
                    Редактировать
                </LoadingButton>)}
        </Stack>
    );
};

export default MachineryReportActionButtons;