import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import PhotoPaginator from "../../../components/common/photoPaginator/photoPaginator";
import DeleteIcon from "@mui/icons-material/Delete";
import {filesPath} from "../../../api/files";
import {fetchDeleteMachineryPhoto, fetchUploadMachineryPhoto} from "../model/actions";
import {IMachinery} from "../../../models/iMachinery";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {styled} from "@mui/material/styles";
import {getMachineryIsLoading} from "../model/selectors";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";


interface IProps {
    machinery: IMachinery;
}

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

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
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

const MachineryDetailsPhotos: FC<IProps> = ({machinery}) => {
    const isLoading = useAppSelector(getMachineryIsLoading);
    const dispatch = useAppDispatch();
    const [activePhoto, setActivePhoto] = useState(0);
    const photoPath = machinery.photos ? `${filesPath}/${machinery.photos[activePhoto]}` : "#";
    const photoUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            dispatch(fetchUploadMachineryPhoto({
                machinery: machinery,
                formData: formData,
            }));
        }
    };
    const photoClickHandler = (photoNumber: number) => {
        setActivePhoto(photoNumber);
    };
    const deletePhotoHandler = () => {
        dispatch(fetchDeleteMachineryPhoto({
            machinery: machinery,
            deletePhoto: machinery.photos[activePhoto],
        }));
        setActivePhoto(0);
    };
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <ImageContainer sx={{aspectRatio: "16/9"}}>
                <StyledImage src={photoPath} alt="machinery_photo"/>

                <StyledLoadingButton
                    color="error"
                    onClick={deletePhotoHandler}
                    loading={isLoading}
                    loadingIndicator={<CircularProgress size={16} color="inherit" />}
                >
                    <DeleteIcon fontSize="small" />
                </StyledLoadingButton>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    disabled={machinery.photos.length > 4 || isLoading}
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
            <Stack direction="row" justifyContent="center" alignItems="center" >
                <PhotoPaginator
                    activePhoto={activePhoto}
                    photoCount={machinery.photos.length}
                    onPhotoClick={photoClickHandler}
                />
            </Stack>
        </Box>
    );
};

export default MachineryDetailsPhotos;