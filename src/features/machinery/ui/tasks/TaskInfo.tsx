import React, {FC} from "react";
import {Stack, Chip} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PhotosManager from "../../../../components/common/PhotosManager";
import {INewTask, ITask} from "../../../../models/ITasks";
import {useAppSelector} from "../../../../hooks/redux";
import {getUserById} from "../../../users/model/selectors";
import PersonIcon from "@mui/icons-material/Person";
import dayjs from "dayjs";
import {getPriorityColor, isTask} from "../../../../utils/services";
import {filesPath} from "../../../files/api";
import {taskPriority} from "../../utils/const";

interface IProps {
    task: ITask | INewTask;
}

const TaskInfo: FC<IProps> = ({task}) => {
    const author = useAppSelector(state => getUserById(state, task.author_id));
    const assigned_to = useAppSelector(state => getUserById(state, task.assigned_to_id));
    const issuePhotoPaths = task.issue_photos?.map(photo => `${filesPath}/${photo}`) || null;
    const chipColor = getPriorityColor(task.priority_id);
    console.log(task.issue_photos);
    return (
        <Stack spacing={3}>
            <Stack spacing={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>
                        до: {task.due_date ? dayjs(task.due_date).format("DD.MM.YY") : "нет даты"}
                    </Typography>
                    <Chip color={chipColor} label={taskPriority[task.priority_id].title} size="medium"/>
                </Stack>
                <Typography variant="h5" fontWeight="bold">
                    {task.title}
                </Typography>
                <Typography variant="subtitle1">
                    Описание:
                </Typography>
                <Box sx={{bgcolor: "#f8f9fa", p: 2, borderRadius: 1}}>
                    <Typography variant="body1" color="text.secondary">
                        {task.description}
                    </Typography>
                </Box>
            </Stack>
            {issuePhotoPaths && (
                <Box>
                    <Typography variant="subtitle1"
                                sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}>
                        Фотографии задачи:
                    </Typography>
                    <PhotosManager photosPaths={task.issue_photos.map(photo => `${filesPath}/${photo}`)}
                                   isViewingOnly={true}/>
                </Box>
            )}
            {isTask(task) && task.status_id === 2 && (
                <Stack spacing={3}>
                    <Typography variant="subtitle1">
                        Описание результата:
                    </Typography>
                    <Box sx={{bgcolor: "#f8f9fa", p: 2, borderRadius: 1}}>
                        <Typography variant="body1" color="text.secondary">
                            {task.result_description}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1">
                        Потраченные материалы:
                    </Typography>
                    <Box sx={{bgcolor: "#f8f9fa", p: 2, borderRadius: 1}}>
                        <Typography variant="body1" color="text.secondary">
                            {task.spent_resources}
                        </Typography>
                    </Box>
                    {task.result_photos.length > 0 && (
                        <>
                            <Typography variant="subtitle1">
                                Фотографии результата:
                            </Typography>
                            <PhotosManager photosPaths={task.result_photos.map(photo => `${filesPath}/${photo}`)}
                                           isViewingOnly={true}/>
                        </>

                    )}
                </Stack>
            )}
            <Box sx={{display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "space-between"}}>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        <PersonIcon sx={{fontSize: 16, mr: 0.5}}/>
                        Исполнитель
                    </Typography>
                    <Typography variant="body1">
                        {assigned_to && `${assigned_to.first_name} ${assigned_to.middle_name}`}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        <PersonIcon sx={{fontSize: 16, mr: 0.5}}/>
                        Автор
                    </Typography>
                    <Typography variant="body1">
                        {author && `${author.first_name} ${author.middle_name}`}
                    </Typography>
                </Box>
            </Box>
        </Stack>

    );
};

export default TaskInfo;
