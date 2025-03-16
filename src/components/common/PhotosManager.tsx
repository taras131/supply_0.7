import React, {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
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
    maxWidth: "90%",
    maxHeight: "90%",
    objectFit: "contain",
});

const CloseButton = styled(IconButton)(({theme}) => ({
    position: "absolute",
    top: 16,
    right: 16,
    color: theme.palette.common.white,
}));

const NavigationButton = styled(IconButton)(({theme}) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    color: theme.palette.text.primary,
    "&:hover": {
        backgroundColor: theme.palette.background.paper,
    },
    "&.Mui-disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
    },
}));

const FullscreenNavigationButton = styled(IconButton)(({theme}) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: theme.palette.common.white,
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
    "&.Mui-disabled": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
}));

const FullscreenPrevButton = styled(FullscreenNavigationButton)({
    left: 16,
});

const FullscreenNextButton = styled(FullscreenNavigationButton)({
    right: 16,
});

const PrevButton = styled(NavigationButton)({
    left: 10,
});

const NextButton = styled(NavigationButton)({
    right: 10,
});

const ImageContainer = styled(Box)(({theme}) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: "20px",
    backgroundColor: "inherit",
    overflow: "hidden",
}));

const StyledImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "contain",
    backgroundColor: "inherit",
    borderRadius: "8px",
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
            color: theme.palette.error.contrastText,
        },
    })
);

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

interface IProps {
    photosPaths: string [];
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
    const isLoading = false;
    const photoClickHandler = (photoNumber: number) => {
        setActivePhoto(photoNumber);
    };
    const toggleFullscreen = () => {
        if (photosPaths && photosPaths.length > 0) {
            setIsFullscreen(prev => !prev);
        }

    };
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
    const addPhotoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onAddPhoto) return;
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onAddPhoto(selectedFile);
        }
    };
    const deletePhotoHandler = () => {
        if (!onDeletePhoto) return;
        if (!isViewingOnly) {
            setActivePhoto(0);
            onDeletePhoto(activePhoto);
        }
    };
    const handlePrevPhoto = () => {
        setActivePhoto((prev) => (prev > 0 ? prev - 1 : prev));
    };
    const handleNextPhoto = () => {
        setActivePhoto((prev) => (prev < photosPaths.length - 1 ? prev + 1 : prev));
    };
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2, position: "relative"}}>
            <ImageContainer sx={{aspectRatio: "16/9"}}>
                <StyledImage
                    onClick={toggleFullscreen}
                    style={{cursor: photosPaths && photosPaths.length > 0 ? "pointer" : "default"}}
                    src={photosPaths && photosPaths.length > 0
                        ? photosPaths[activePhoto]
                        : photoPlaceholder}
                    alt="photo"
                />
                {photosPaths && photosPaths.length > 1 && (
                    <>
                        <PrevButton
                            onClick={handlePrevPhoto}
                            disabled={activePhoto === 0}
                        >
                            <ChevronLeftIcon/>
                        </PrevButton>

                        <NextButton
                            onClick={handleNextPhoto}
                            disabled={activePhoto === photosPaths.length - 1}
                        >
                            <ChevronRightIcon/>
                        </NextButton>
                    </>
                )}
                {!isViewingOnly && (
                    <>
                        {photosPaths && photosPaths.length > 0 && (
                            <StyledDeleteButton
                                color="error"
                                onClick={deletePhotoHandler}
                                loading={isLoading}
                                loadingIndicator={<CircularProgress size={16} color="inherit"/>}
                            >
                                <DeleteIcon fontSize="small"/>
                            </StyledDeleteButton>
                        )}
                        <StyledUploadButton
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            disabled={isLoading || photosPaths && photosPaths.length >= photosCountLimit}
                        >
                            <UploadIcon fontSize="small"/>
                            <VisuallyHiddenInput
                                type="file"
                                onChange={addPhotoHandler}
                                accept="image/jpeg, image/png, image/jpg"
                                multiple
                            />
                        </StyledUploadButton>
                    </>
                )}
                {isFullscreen && (
                    <FullscreenContainer>
                        <FullscreenImage
                            src={photosPaths[activePhoto]}
                            alt="fullscreen photo"
                        />
                        <CloseButton onClick={toggleFullscreen}>
                            <CloseIcon/>
                        </CloseButton>
                        {photosPaths.length > 1 && (
                            <>
                                <FullscreenPrevButton
                                    onClick={handlePrevPhoto}
                                    disabled={activePhoto === 0}
                                >
                                    <ChevronLeftIcon/>
                                </FullscreenPrevButton>
                                <FullscreenNextButton
                                    onClick={handleNextPhoto}
                                    disabled={activePhoto === photosPaths.length - 1}
                                >
                                    <ChevronRightIcon/>
                                </FullscreenNextButton>
                            </>
                        )}
                    </FullscreenContainer>
                )}
            </ImageContainer>
            <PhotoPaginator
                activePhoto={activePhoto}
                photoCount={photosPaths?.length || 0}
                onPhotoClick={photoClickHandler}
            />
        </Box>
    );
};

export default PhotosManager;