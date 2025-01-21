import React, {ChangeEvent, FC, useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Backdrop, CardActions, CardMedia, Modal, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getCurrentMachineryId, getMachineryIsLoading} from "../model/selectors";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {CENTER, ROW, SPACE_BETWEEN} from "../../../styles/const";
import Box from "@mui/material/Box";
import placeholderImage from "../../../assets/images/fileUploadPlaceholder.png";
import {fetchAddMachineryDoc} from "../model/actions";

const AnimatedCard = styled(Card)(({theme}) => ({
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    "&:hover": {
        transform: "scale(1.02)",
    },
}));

// Стили для модального окна
const ModalCard = styled(Card)(({theme}) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    minHeight: "600px",
    overflow: "auto",
    transition: "all 0.3s ease-in-out",
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


const MachineryDetailsDocsAddNew = () => {
    const dispatch = useAppDispatch();
    const machineryId = useAppSelector(getCurrentMachineryId);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const isLoading = useAppSelector(getMachineryIsLoading);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setPreview("");
        setFile(null);
        setTitle("");
    };
    const titleChangeHandler = (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };
    const photoUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
        }
    };
    const addDocClickHandler = () => {
        if(file && title) {
            const formData = new FormData();
            formData.append("file", file);
            dispatch(fetchAddMachineryDoc({
                doc: {title: title, machinery_id: machineryId},
                formData: formData,
            }));
        }
    };
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);
    return (
        <>
            <AnimatedCard sx={{minWidth: 225}} onClick={handleOpen}>
                <CardContent >
                    <Typography variant="h5" component="div" textAlign={CENTER}>
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
                    <Typography sx={{color: "text.secondary", mb: 1.5}} textAlign={CENTER}>
                        Кликните на карточку , чтобы добавить новый документ
                    </Typography>
                </CardContent>
            </AnimatedCard>

            <Modal
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <ModalCard sx={{padding: "25px", position: "relative"}}>
                    <CardContent>
                        <Typography variant="h4" fontWeight={700} fontSize={"26px"}>
                            Добавление нового документа:
                        </Typography>
                        <Typography sx={{color: "text.secondary", mb: 1.5}} variant="body2" mt={1}>
                            Введите название документа и загрузите его изображение
                        </Typography>
                        <Box
                            sx={{
                                mt: 4,
                                width: "100%",
                                height: "300px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                        borderRadius: "8px",
                                    }}
                                />
                            ) : (
                                <img
                                    src={placeholderImage} // Укажите путь к вашей заглушке
                                    alt="Placeholder"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                        opacity: 0.5, // Прозрачность для заглушки
                                    }}
                                />
                            )}
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Stack spacing={4}
                               alignItems={CENTER}
                               justifyContent={CENTER}
                               sx={{width: "100%"}}>
                            <TextField id="outlined-basic"
                                       fullWidth
                                       label="Наименование"
                                       variant="outlined"
                                       name="title"
                                       onChange={titleChangeHandler}
                                       value={title}/>
                            <Stack sx={{width: "100%"}} direction={ROW} alignItems={CENTER} justifyContent={SPACE_BETWEEN}>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    disabled={isLoading}
                                >
                                    {file ? "Изменить файл" : "Загрузить файл"}
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={photoUploadHandler}
                                        accept="image/jpeg, image/png, image/jpg"
                                        multiple
                                    />
                                </Button>
                                <Button variant={"contained"}
                                        onClick={addDocClickHandler}
                                        color={"success"}
                                        disabled={title.length === 0 || !file}>
                                    Добавить
                                </Button>
                            </Stack>
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