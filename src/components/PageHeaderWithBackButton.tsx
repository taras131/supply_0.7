import React, {FC} from "react";
import {Button, Stack, Typography, useMediaQuery} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {STRING_EMPTY} from "../utils/const";
import {LARGE, ROW, SMALL, SPACE_BETWEEN, START} from "../styles/const";

interface IProps {
    backRoute: string
    title: string
    isValidate: boolean
    handleAddClick: () => void
    errorMessage?: string
}

const PageHeaderWithBackButton: FC<IProps> = ({
                                                  backRoute,
                                                  title,
                                                  isValidate,
                                                  handleAddClick,
                                                  errorMessage = STRING_EMPTY,
                                              }) => {
    const navigate = useNavigate();
    const location: any = useLocation();
    const matches_700 = useMediaQuery("(min-width:700px)");
    const handleBackClick = () => {
        if (location && location.state && location.state.from) {
            navigate(location.state.from);
        } else {
            navigate(backRoute);
        }
    };

    return (
        <Stack sx={{maxWidth: 1350, width: "100%"}}
               direction={ROW}
               alignItems={START}
               justifyContent={SPACE_BETWEEN}>
            <Button variant="outlined"
                    size={matches_700 ? LARGE : SMALL}
                    onClick={handleBackClick}>
                Назад
            </Button>
            <Typography variant="h2"
                        fontSize={matches_700 ? "24px" : "18px"}
                        fontWeight={matches_700 ? 700 : 600}>
                {title}
            </Typography>
            <Stack spacing={1}>
                <Button variant="contained"
                        size={matches_700 ? LARGE : SMALL}
                        onClick={handleAddClick}
                        disabled={!isValidate}>
                    Сохранить
                </Button>
                <Typography fontSize={"12px"}>
                    {errorMessage}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default PageHeaderWithBackButton;