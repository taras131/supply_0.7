import React, { FC, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions, CardMedia, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IMachineryDoc } from "../../../../models/iMachinery";
import { CENTER } from "../../../../styles/const";
import {filesPath} from "../../../files/api";
import {printImage} from "../../../../utils/printUtils";

const AnimatedCard = styled(Card)<{ expanded?: boolean }>(({ theme, expanded }) => ({
    minWidth: 225,
    transition: "transform 0.3s ease, opacity 0.3s ease",
    cursor: "pointer",
    position: expanded ? "fixed" : "relative",
    top: expanded ? "50%" : "auto",
    left: expanded ? "50%" : "auto",
    transform: expanded ? "translate(-50%, -50%) scale(1.05)" : "none",
    zIndex: expanded ? 1000 : 1,
    width: expanded ? "80vw" : "auto",
    maxWidth: expanded ? "1200px" : "none",
    maxHeight: expanded ? "90vh" : "auto",
    opacity: expanded ? 1 : 1,
}));

const Backdrop = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    transition: "opacity 0.3s ease-in-out",
}));

interface IProps {
    doc: IMachineryDoc;
}

const MachineryDetailsDocsItem: FC<IProps> = ({ doc }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const photoPath = `${filesPath}/${doc.file_name}`;

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(false);
    };
    const dowloadHandler = async (e: any) => {
        e.stopPropagation(); // Остановить всплытие клика
    };
    const printHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        printImage(photoPath, doc.title); // Использование новой функции
    };
    return (
        <>
            {isExpanded && <Backdrop onClick={handleBackdropClick} />}
            <AnimatedCard
                expanded={isExpanded}
                onClick={handleClick}
                sx={{zIndex: isExpanded ? 2000 : 100}}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        textAlign={CENTER}
                        sx={{ mb: 2 }}
                    >
                        {doc.title}
                    </Typography>
                    <CardMedia
                        component="img"
                        image={photoPath}
                        alt="upload doc"
                        sx={{
                            objectFit: "contain",
                            height: isExpanded ? "auto" : "200px",
                            maxHeight: isExpanded ? "70vh" : "200px",
                            width: "100%",
                        }}
                    />
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    {!isExpanded && <Button size="small">Увеличить</Button>}
                    {isExpanded && (
                        <Button
                            size="small"
                            onClick={dowloadHandler}
                        >
                            Скачать файл
                        </Button>
                    )}
                    <Button size="small" onClick={printHandler}>
                        Печать
                    </Button>
                </CardActions>
            </AnimatedCard>
        </>
    );
};

export default MachineryDetailsDocsItem;

