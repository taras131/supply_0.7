import React, {FC} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardActionArea, Stack} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";

interface IProps {
    title: string
    route: string
    children: React.ReactNode

}

const MainMenuListItem: FC<IProps> = ({title, children, route}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(route);
    };
    return (
        <Grid xs={6}>
            <Card sx={{height: "250px"}} onClick={handleClick}>
                <CardActionArea sx={{height: "100%"}}>
                    <CardContent sx={{height: "100%"}}>
                        <Stack spacing={1} justifyContent={"space-between"} sx={{height: "100%"}}>
                            <Typography gutterBottom variant="h5" fontWeight={600}>
                                {title}
                            </Typography>
                            {children}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default MainMenuListItem;