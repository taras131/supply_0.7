import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoPaginator from "./photoPaginator/photoPaginator";
import {styled} from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
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
const StyledUploadButton = styled(LoadingButton)(({theme}) => ({
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

interface IBaseProps {
    photoPaths: string[];
    isLoading?: boolean;
    isViewingOnly?: boolean;
}

interface IEditableProps extends IBaseProps {
    isViewingOnly?: false;
    onDeletePhoto: (index: number) => void;
    photoUploadHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IViewOnlyProps extends IBaseProps {
    isViewingOnly: true;
    onDeletePhoto?: never;
    photoUploadHandler?: never;
}

type IProps = IEditableProps | IViewOnlyProps;

const Photos: FC<IProps> = ({
                                photoPaths,
                                isLoading = false,
                                onDeletePhoto,
                                photoUploadHandler,
                                isViewingOnly=false,
                            }) => {
    const [activePhoto, setActivePhoto] = useState(0);
    const photoClickHandler = (photoNumber: number) => {
        setActivePhoto(photoNumber);
    };
    const deletePhotoHandler = () => {
        if (!isViewingOnly && onDeletePhoto) {
            setActivePhoto(0);
            onDeletePhoto(activePhoto);
        }
    };
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <ImageContainer sx={{aspectRatio: "16/9"}}>
                <StyledImage src={photoPaths.length > 0
                    ? photoPaths[activePhoto]
                    : photoPlaceholder}
                             alt="photo"/>
                {!isViewingOnly && (
                    <>
                        <StyledDeleteButton
                            color="error"
                            onClick={deletePhotoHandler}
                            loading={isLoading}
                            loadingIndicator={<CircularProgress size={16} color="inherit"/>}
                        >
                            <DeleteIcon fontSize="small"/>
                        </StyledDeleteButton>
                        <StyledUploadButton
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            disabled={photoPaths.length > 4 || isLoading}
                        >
                            <UploadIcon fontSize="small"/>
                            <VisuallyHiddenInput
                                type="file"
                                onChange={photoUploadHandler}
                                accept="image/jpeg, image/png, image/jpg"
                                multiple
                            />
                        </StyledUploadButton>
                    </>
                )}
            </ImageContainer>
            <PhotoPaginator
                activePhoto={activePhoto}
                photoCount={photoPaths.length}
                onPhotoClick={photoClickHandler}
            />
        </Box>
    );
};

export default Photos;