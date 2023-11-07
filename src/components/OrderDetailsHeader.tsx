import React, {FC} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../utils/routes";

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
    console.log(location)
    const handleBackClick = () => {
        if (location.state && location.state.from) {
            navigate(location.state.from);
        } else {
            navigate(routes.orders);
        }
    };
    return (
        <Stack sx={{maxWidth: 1000, width: "100%"}}
               direction={"row"}
               alignItems={"center"}
               justifyContent={"space-between"}>
            {isEdit && !isNewOrder
                ? (<Button variant="outlined" size="large" onClick={toggleIsEdit}>Отмена</Button>)
                : (<Button variant="outlined" size="large" onClick={handleBackClick}>Назад</Button>)}
            <Typography variant="h2" fontSize="24px" fontWeight={700}>
                {isNewOrder && "Новая заявка"}
                {!isNewOrder && isEdit && "Редактирование"}
            </Typography>
            {isEdit
                ? (<Button variant="contained" size="large" onClick={handleAddClick} disabled={!isValidate}>
                    Сохранить
                </Button>)
                : (<Button variant="contained" size="large" onClick={toggleIsEdit}>
                    Редактировать
                </Button>)}
        </Stack>
    );
};

export default OrderDetailsHeader;