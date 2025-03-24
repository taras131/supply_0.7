import React, {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoPaginator from "./photoPaginator/photoPaginator";
import {styled} from "@mui/material/styles";
import LoadingButton, {LoadingButtonProps} from "@mui/lab/LoadingButton";
import UploadIcon from "@mui/icons-material/Upload";
import photoPlaceholder from "../../assets/images/placeholder.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const FullscreenContainer = styled(Box)({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
});

const FullscreenImage = styled("img")({
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
});

const VisuallyHiddenInput = styled("input")({
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    border: "none",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    clipPath: "inset(50%)",
});


const StyledDeleteButton = styled(LoadingButton)(({theme}) => ({
    position: "absolute",
    bottom: 16,
    left: 16,
    padding: 8,
    minWidth: "auto",
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
    "&.MuiLoadingButton-loading": {
        backgroundColor: theme.palette.action.disabledBackground,
    },
    "&:hover": {
        backgroundColor: theme.palette.error.main,
    },
}));

const StyledUploadButton = styled(LoadingButton)<LoadingButtonProps & { component?: React.ElementType }>(
    ({theme}) => ({
        position: "absolute",
        bottom: 16,
        right: 16,
        padding: 8,
        minWidth: "auto",
        backgroundColor: theme.palette.success.main,
        "&.MuiLoadingButton-loading": {
            backgroundColor: theme.palette.action.disabledBackground,
        },
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
            color: theme.palette.success.contrastText,
        },
    })
);

const CloseButton = styled(IconButton)(({theme}) => ({
    position: "absolute",
    top: 16,
    right: 16,
    color: theme.palette.common.white,
}));

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

const ImageContainer = styled(Box)(() => ({

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "400px", // Фиксированная высота для обычного режима
    borderRadius: "20px",
    backgroundColor: "inherit",
    overflow: "hidden",
}));

const StyledImage = styled("img")<{ isFullscreen?: boolean }>(({isFullscreen}) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    objectFit: isFullscreen ? "contain" : "cover", // "cover" для обычного режима, "contain" для полноэкранного
    backgroundColor: "inherit",
    borderRadius: isFullscreen ? 0 : "8px", // Убираем скругления в полноэкранном режиме
}));

interface IProps {
    photosPaths: string[];
    isViewingOnly?: boolean;
    onAddPhoto?: (newFile: File) => void;
    onDeletePhoto?: (deletedFileIndex: number) => void;
    photosCountLimit?: number;
}

const PhotosManager: FC<IProps> = ({
                                       photosPaths,
                                       onAddPhoto,
                                       onDeletePhoto,
                                       isViewingOnly = false,
                                       photosCountLimit = 10,
                                   }) => {
    const [activePhoto, setActivePhoto] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isFullscreen) {
                setIsFullscreen(false);
            }
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isFullscreen]);
    const toggleFullscreen = () => {
        if (photosPaths && photosPaths.length > 0) {
            setIsFullscreen((prev) => !prev);
        }
    };

    const handlePrevPhoto = () => {
        setActivePhoto((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNextPhoto = () => {
        setActivePhoto((prev) => (prev < photosPaths.length - 1 ? prev + 1 : prev));
    };
    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onAddPhoto) return;

        const files = e.target.files; // Сохраняем files в переменную для дальнейшей проверки
        if (files && files[0]) { // Проверяем, что files не null и содержит хотя бы один файл
            const selectedFile = files[0];

            // Проверяем MIME-тип файла
            if (selectedFile.type.startsWith("image/")) {
                onAddPhoto(selectedFile);
            } else {
                alert("Можно загружать только изображения (JPEG, PNG и т.д.)");
            }
        }
    };
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, position: "relative"}}>
            {/* Обычное отображение с фиксированной высотой */}
            <ImageContainer>
                <StyledImage
                    isFullscreen={isFullscreen}
                    onClick={toggleFullscreen}
                    style={{cursor: photosPaths?.length > 0 ? "pointer" : "default"}}
                    src={photosPaths?.length > 0 ? photosPaths[activePhoto] : photoPlaceholder}
                    alt="photo"
                />

                {photosPaths?.length > 1 && (
                    <>
                        <NavigationButton
                            isFullscreen={false}
                            position="left"
                            onClick={handlePrevPhoto}
                            disabled={activePhoto === 0}
                        >
                            <ChevronLeftIcon/>
                        </NavigationButton>
                        <NavigationButton
                            isFullscreen={false}
                            position="right"
                            onClick={handleNextPhoto}
                            disabled={activePhoto === photosPaths.length - 1}
                        >
                            <ChevronRightIcon/>
                        </NavigationButton>
                    </>
                )}

                {!isViewingOnly && photosPaths?.length > 0 && (
                    <StyledDeleteButton onClick={() => onDeletePhoto?.(activePhoto)} color="error">
                        <DeleteIcon/>
                    </StyledDeleteButton>
                )}

                {!isViewingOnly && (
                    <StyledUploadButton
                        component="label"
                        disabled={photosPaths.length >= photosCountLimit}
                    >
                        <UploadIcon/>
                        <VisuallyHiddenInput type="file"
                                             onChange={handleAddPhoto}
                                             accept="image/jpeg, image/png, image/jpg"/>
                    </StyledUploadButton>
                )}
            </ImageContainer>

            {/* Полноэкранный режим */}
            {isFullscreen && (
                <FullscreenContainer>
                    <FullscreenImage src={photosPaths[activePhoto]} alt="fullscreen photo"/>
                    <CloseButton onClick={toggleFullscreen}>
                        <CloseIcon/>
                    </CloseButton>

                    {photosPaths?.length > 1 && (
                        <>
                            <NavigationButton
                                isFullscreen={true}
                                position="left"
                                onClick={handlePrevPhoto}
                                disabled={activePhoto === 0}
                            >
                                <ChevronLeftIcon/>
                            </NavigationButton>
                            <NavigationButton
                                isFullscreen={true}
                                position="right"
                                onClick={handleNextPhoto}
                                disabled={activePhoto === photosPaths.length - 1}
                            >
                                <ChevronRightIcon/>
                            </NavigationButton>
                        </>
                    )}

                    <PhotoPaginator
                        activePhoto={activePhoto}
                        photoCount={photosPaths.length}
                        onPhotoClick={setActivePhoto}
                    />
                </FullscreenContainer>
            )}

            {/* Пагинация в обычном режиме */}
            {!isFullscreen && (
                <PhotoPaginator
                    activePhoto={activePhoto}
                    photoCount={photosPaths.length}
                    onPhotoClick={setActivePhoto}
                />
            )}
        </Box>
    );
};

export default PhotosManager;
