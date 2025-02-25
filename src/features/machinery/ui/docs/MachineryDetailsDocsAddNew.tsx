import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Backdrop, CardActions, CardMedia, Modal, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {getCurrentMachineryId} from "../../model/selectors";
import {styled} from "@mui/material/styles";
import placeholderImage from "../../../../assets/images/fileUploadPlaceholder.png";
import {fetchAddMachineryDoc} from "../../model/actions";
import PhotosManager from "../../../../components/common/PhotosManager";
import FieldControl from "../../../../components/common/FieldControl";
import {useEditor} from "../../../../hooks/useEditor";
import {IDoc} from "../../../../models/iMachinery";
import {docValidate} from "../../../../utils/validators";
import usePhotoManager from "../../../../hooks/usePhotoManager";

const AnimatedCard = styled(Card)(() => ({
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    "&:hover": {
        transform: "scale(1.02)",
    },
}));

const ModalCard = styled(Card)(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    minHeight: "600px",
    overflow: "auto",
    transition: "all 0.3s ease-in-out",
}));

const initialDoc: IDoc = {docTitle: ""};

const MachineryDetailsDocsAddNew = () => {
    const dispatch = useAppDispatch();
    const machineryId = useAppSelector(getCurrentMachineryId);
    const [isOpen, setIsOpen] = useState(false);
    const {tempFiles, onAddPhoto, onDeletePhoto, clearPhotos} = usePhotoManager();
    const {
        editedValue,
        errors,
        resetValue,
        handleFieldChange,
    } = useEditor<IDoc>({
        initialValue: initialDoc,
        validate: docValidate,
    });
    useEffect(() => {
        return () => clearPhotos();
    }, []);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        clearPhotos();
        resetValue();
    };
    if (!machineryId) return null;
    const addDocClickHandler = () => {
        if (tempFiles[0] && Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append("file", tempFiles[0].file);
            dispatch(fetchAddMachineryDoc({
                doc: {title: editedValue.docTitle, machinery_id: machineryId},
                formData: formData,
            }));
        }
        handleClose();
    };
    return (
        <>
            <AnimatedCard sx={{minWidth: 225}} onClick={handleOpen}>
                <CardContent>
                    <Typography color="primary" variant="h5" component="div" textAlign="center">
                        Добавить документ
                    </Typography>
                    <CardMedia
                        component="img"
                        height="200"
                        image={placeholderImage}
                        alt="upload doc"
                        sx={{
                            objectFit: "contain",
                            maxHeight: 200,
                        }}
                    />
                    <Typography sx={{color: "text.secondary", mb: 1.5}} textAlign="center">
                        Кликните на карточку , чтобы добавить новый документ
                    </Typography>
                </CardContent>
            </AnimatedCard>
            <Modal
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{
                    backdrop: Backdrop,
                }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <ModalCard sx={{padding: "24px", position: "relative"}}>
                    <CardContent>
                        <Stack spacing={4}>
                            <Typography color="primary" variant="h5" fontWeight={700} fontSize={"26px"}>
                                Добавление нового документа:
                            </Typography>
                            <PhotosManager
                                photosPaths={tempFiles.map(file => file.preview)}
                                onAddPhoto={onAddPhoto}
                                onDeletePhoto={onDeletePhoto}
                                isViewingOnly={false}
                                photosCountLimit={1}
                            />
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Stack spacing={2}
                               direction="row"
                               alignItems="center"
                               justifyContent="space-between"
                               sx={{width: "100%"}}>
                            <FieldControl
                                label="Название документа"
                                name="docTitle"
                                id="docTitle"
                                value={editedValue.docTitle}
                                error={errors?.docTitle}
                                isEditMode={true}
                                isRequired
                                onChange={handleFieldChange}
                            />
                            <Button variant={"contained"}
                                    onClick={addDocClickHandler}
                                    color={"success"}
                                    disabled={Object.keys(errors).length > 0 || tempFiles.length === 0}>
                                Добавить
                            </Button>
                        </Stack>
                    </CardActions>
                    <Button sx={{position: "absolute", top: "6px", right: "6px"}}
                            onClick={handleClose}>
                        Закрыть
                    </Button>
                </ModalCard>
            </Modal>
        </>
    );
};

export default MachineryDetailsDocsAddNew;