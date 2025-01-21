import React, {FC} from "react";
import {Stack} from "@mui/material";
import {CENTER, ROW} from "../../../styles/const";
import Box from "@mui/material/Box";

interface IProps {
    activePhoto: number
    photoCount: number
    onPhotoClick: (photoNumber: number) => void
}

const PhotoPaginator:FC<IProps> = ({activePhoto, photoCount, onPhotoClick}) => {
    return (
        <Stack direction={ROW} alignItems={CENTER} justifyContent={CENTER} spacing={2}>
            {Array.from({ length: photoCount }).map((_, index) => (
                <Box
                    key={index}
                    onClick={() => onPhotoClick(index)}
                    sx={{
                        width: 15,
                        height: 15,
                        borderRadius: "50%",
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
            ))}
        </Stack>
    );
};

export default PhotoPaginator;