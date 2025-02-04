import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoPaginator from "./photoPaginator/photoPaginator";
import {styled} from "@mui/material/styles";
import LoadingButton, {LoadingButtonProps} from "@mui/lab/LoadingButton";
import UploadIcon from "@mui/icons-material/Upload";
import photoPlaceholder from "../../assets/images/placeholder.png";

const ImageContainer = styled(Box)(({theme}) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    overflow: "hidden",
}));

const StyledImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "contain",
    backgroundColor: "#f0f0f0",
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
    const isLoading = false;
    const photoClickHandler = (photoNumber: number) => {
        setActivePhoto(photoNumber);
    };
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
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <ImageContainer sx={{aspectRatio: "16/9"}}>
                <StyledImage src={photosPaths && photosPaths.length > 0
                    ? photosPaths[activePhoto]
                    : photoPlaceholder}
                             alt="photo"/>
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