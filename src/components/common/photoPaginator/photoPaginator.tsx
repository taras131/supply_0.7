import React, {FC} from "react";
import {Stack} from "@mui/material";
import {CENTER, ROW} from "../../../styles/const";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const NavigationButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "isFullscreen" && prop !== "position",
})<{ isFullscreen: boolean; position: "left" | "right" }>(({theme, isFullscreen, position}) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [position]: 16,
    backgroundColor: isFullscreen ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.4)",
    color: isFullscreen ? theme.palette.common.white : theme.palette.text.primary,
    "&:hover": {
        backgroundColor: isFullscreen
            ? "rgba(255, 255, 255, 0.4)"
            : theme.palette.background.paper,
    },
    "&.Mui-disabled": {
        backgroundColor: isFullscreen ? "rgba(255, 255, 255, 0.1)" : theme.palette.action.disabledBackground,
    },
}));

interface IProps {
    activePhoto: number;
    photoCount: number;
    onPhotoClick: (photoNumber: number) => void;
    handlePrevPhoto: () => void;
    handleNextPhoto: () => void;
}

const PhotoPaginator: FC<IProps> = ({
                                        activePhoto,
                                        photoCount,
                                        onPhotoClick,
                                        handlePrevPhoto,
                                        handleNextPhoto,
                                    }) => {
    const paginatorList = Array.from({length: photoCount}).map((_, index) => (
        <Box
            key={index}
            onClick={() => onPhotoClick(index)}
            sx={{
                width: 30,
                height: 7,
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: activePhoto === index ? "primary.main" : "grey.300", // активный кружок
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s", // анимация изменения цвета
                "&:hover": {
                    backgroundColor: activePhoto !== index ? "grey.400" : "primary.light", // эффекты при наведении
                },
            }}
        >
        </Box>
    ));
    return (
        <>
            <NavigationButton
                isFullscreen={true}
                position="left"
                onClick={handlePrevPhoto}
                disabled={activePhoto === 0}
            >
                <ChevronLeftIcon/>
            </NavigationButton>
            <Stack direction={ROW}
                   alignItems={CENTER}
                   justifyContent={CENTER}
                   spacing={1}
                   sx={{position: "absolute", bottom: 10, width: "100%"}}>
                {photoCount < 2
                    ? (<div></div>)
                    : (<>{paginatorList}</>)
                }
            </Stack>
            <NavigationButton
                isFullscreen={true}
                position="right"
                onClick={handleNextPhoto}
                disabled={activePhoto === photoCount - 1}
            >
                <ChevronRightIcon/>
            </NavigationButton>
        </>
    );
};

export default PhotoPaginator;