import React, {FC} from "react";
import {Button, Stack, Typography, useMediaQuery} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";
import {LARGE, SMALL} from "../styles/const";

interface IProps {
    isValidate: boolean
    handleAddClick: () => void
    isEdit: boolean
    isNewOrder: boolean
    toggleIsEdit?: () => void
}

const OrderDetailsHeader: FC<IProps> = ({
                                            isValidate,
                                            handleAddClick,
                                            isEdit,
                                            isNewOrder,
                                            toggleIsEdit,
                                        }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const matches_700 = useMediaQuery("(min-width:700px)");
    const handleBackClick = () => {
        if (location.state && location.state.from) {
            navigate(location.state.from);
        } else {
            navigate(routes.orders);
        }
    };
    return (
        <Stack sx={{maxWidth: 1350, width: "100%"}}
               direction={"row"}
               alignItems={"center"}
               justifyContent={"space-between"}>
            {isEdit && !isNewOrder
                ? (<Button variant="outlined" size={matches_700 ? LARGE : SMALL} onClick={toggleIsEdit}>
                    Отмена
                </Button>)
                : (<Button variant="outlined" size={matches_700 ? LARGE : SMALL} onClick={handleBackClick}>
                    Назад
                </Button>)}
            <Typography variant="h2" fontSize={matches_700 ? "24px" : "18px"} fontWeight={matches_700 ? 600 : 500}>
                {isNewOrder && "Новая заявка"}
                {!isNewOrder && isEdit && "Редактирование"}
            </Typography>
            {isEdit
                ? (<Button variant="contained" size={matches_700 ? LARGE : SMALL} onClick={handleAddClick}
                           disabled={!isValidate}>
                    Сохранить
                </Button>)
                : (<Button variant="contained" size={matches_700 ? LARGE : SMALL} onClick={toggleIsEdit}>
                    Редактировать
                </Button>)}
        </Stack>
    );
};

export default OrderDetailsHeader;