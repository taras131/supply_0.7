import React, {FC} from "react";
import {IProblem} from "../../../../models/IProblems";
import {CardMedia, Stack, Typography} from "@mui/material";
import {ClockIcon} from "@mui/x-date-pickers";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import PrioritiesChip from "../common/PrioritiesChip";
import {useAppSelector} from "../../../../hooks/redux";
import {getUserFullNameById} from "../../../users/model/selectors";
import {filesPath} from "../../../files/api";

interface IProps {
    problem: IProblem;
}

const ProblemCard: FC<IProps> = ({problem}) => {
    const authorName = useAppSelector(state => getUserFullNameById(state, problem.author_id));
    return (
        <Card sx={{display: "flex", flexDirection: "column", height: "100%"}}>
            <CardMedia
                sx={{ height: 140 }}
                image={`${filesPath}/${problem.photos[0]}`}
                title="green iguana"
            />
            <CardContent sx={{flex: "1 1 auto"}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>
                        {authorName}
                    </Typography>

                </Stack>
                <Stack spacing={2}>
                    <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
                        <Typography align="center" variant="h5">
                            {problem.title}
                        </Typography>
                        <Typography color="text.secondary" display="inline" variant="body2">
                            Updated {dayjs(problem.created_date).format("MMM D, YYYY")}
                        </Typography>
                    </Stack>
                        <Typography align="center" variant="body1">
                            {problem.description}
                        </Typography>

                </Stack>
            </CardContent>
            <Divider/>
            <Stack direction="row" spacing={2} sx={{alignItems: "center", justifyContent: "space-between", p: 2}}>
                <Stack sx={{alignItems: "center"}} direction="row" spacing={1}>
                    <PrioritiesChip priorityId={problem.priority_id}/>
                </Stack>
                <Stack sx={{alignItems: "center"}} direction="row" spacing={1}>

                    <Typography color="text.secondary" display="inline" variant="body2">
                        Подробнее
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
};

export default ProblemCard;