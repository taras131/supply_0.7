import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import PhotoPaginator from "./photoPaginator/photoPaginator";
import {styled} from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {filesPath} from "../../api/files";


const ImageContainer = styled(Box)(({theme}) => ({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

const StyledLoadingButton = styled(LoadingButton)(({theme}) => ({
    position: "absolute",
    bottom: 16,
    left: 16,
    padding: 8,
    minWidth: "auto",
    "&.MuiLoadingButton-loading": {
        backgroundColor: theme.palette.action.disabledBackground,
    },
    "&:hover": {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.contrastText,
    },
}));

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
    photos: string [];
    isLoading: boolean;
    onDeletePhoto: (index: number) => void;
    photoUploadHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Photos: FC<IProps> = ({photos, isLoading, onDeletePhoto, photoUploadHandler}) => {
    const [activePhoto, setActivePhoto] = useState(0);
    const photoClickHandler = (photoNumber: number) => {
        setActivePhoto(photoNumber);
    };
    const deletePhotoHandler = () => {
        setActivePhoto(0);
        onDeletePhoto(activePhoto);
    };
    const photoPath = photos ? `${filesPath}/${photos[activePhoto]}` : "#";
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <ImageContainer sx={{aspectRatio: "16/9"}}>
                <StyledImage src={photoPath} alt="machinery_photo"/>
                <StyledLoadingButton
                    color="error"
                    onClick={deletePhotoHandler}
                    loading={isLoading}
                    loadingIndicator={<CircularProgress size={16} color="inherit"/>}
                >
                    <DeleteIcon fontSize="small"/>
                </StyledLoadingButton>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    disabled={photos.length > 4 || isLoading}
                    sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                    }}
                >
                    Загрузить фото
                    <VisuallyHiddenInput
                        type="file"
                        onChange={photoUploadHandler}
                        accept="image/jpeg, image/png, image/jpg"
                        multiple
                    />
                </Button>
            </ImageContainer>
            <PhotoPaginator
                activePhoto={activePhoto}
                photoCount={photos.length}
                onPhotoClick={photoClickHandler}
            />
        </Box>
    );
};

export default Photos;