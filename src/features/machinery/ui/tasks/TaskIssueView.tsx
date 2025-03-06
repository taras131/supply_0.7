import React, {ChangeEvent, FC, useState} from "react";
import Card from "@mui/material/Card";
import {ValidationErrors} from "../../../../utils/validators";
import {SelectChangeEvent, Stack, Typography} from "@mui/material";
import {INewTask, ITask} from "../../../../models/ITasks";
import FieldControl from "../../../../components/common/FieldControl";
import {taskPriority, taskStatus, taskTypes} from "../../utils/const";
import {useAppSelector} from "../../../../hooks/redux";
import {getAllUsers} from "../../../users/model/selectors";
import {getActiveProblems, getProblemTitleById} from "../../model/selectors";
import {convertMillisecondsToDate} from "../../../../utils/services";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ProblemCard from "../problems/ProblemCard";

interface IProps {
    task: INewTask | ITask | null;
    errors?: ValidationErrors;
    isEditMode?: boolean;
    handleDateChange: (date: any) => void;
    fieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void
}

const TaskIssueView: FC<IProps> = ({task, errors, isEditMode = false, fieldChangeHandler, handleDateChange}) => {
    const [isOpenProblemCard, setIsOpenProblemCard] = useState(false);
    const users = useAppSelector(getAllUsers);
    const usersList = users.map(user => ({id: user.id, title: `${user.first_name} ${user.middle_name}`}));
    const activeProblem = useAppSelector(state => getActiveProblems(state, task?.problem_id));
    const problemTitle = useAppSelector(state => getProblemTitleById(state, task?.problem_id));
    const toggleIsOpenProblemCard = () => {
        setIsOpenProblemCard(prev => !prev);
    };
    const activeProblemList = activeProblem.map(problem => ({
        id: problem.id,
        title: `${convertMillisecondsToDate(problem.created_date)} ${problem.title}`,
    }));
    if (!task) return null;
    return (
        <Stack spacing={isEditMode ? 2 : 4}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                {isEditMode
                    ? (<><LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                        <DatePicker
                            label="Срок выполнения"
                            value={dayjs(task.due_date)}
                            onChange={handleDateChange}
                            format="DD.MM.YYYY"
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    variant: "outlined",
                                },
                            }}
                        />
                    </LocalizationProvider>
                        <FieldControl
                            label="Основание"
                            name="problem_id"
                            id="problem_id"
                            value={task.problem_id}
                            error={errors?.problem_id}
                            isEditMode={isEditMode}
                            onChange={fieldChangeHandler}
                            options={activeProblemList}
                        />
                    </>)
                    : (<>
                        <Typography ml={2} variant="subtitle2" sx={{width: "100%"}}>
                            Срок до:
                            <span style={{display: "block", marginTop: "2px"}}>
                            {convertMillisecondsToDate(task.due_date)}
                        </span>
                        </Typography>
                        <Typography ml={2} variant="subtitle2" sx={{width: "100%"}}>
                            Основание:
                            <span style={{display: "block", marginTop: "2px", cursor: "pointer"}}
                                  onClick={toggleIsOpenProblemCard}>
                                {problemTitle}
                            </span>
                        </Typography>
                    </>)}
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <FieldControl
                    label="Заголовок"
                    name="title"
                    id="title"
                    value={task.title}
                    error={errors?.title}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    isRequired
                />
                <FieldControl
                    label="Статус"
                    name="status_id"
                    id="status_id"
                    value={task.status_id}
                    error={errors?.status_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={taskStatus}
                />
            </Stack>
            <FieldControl
                label="Описание"
                name="description"
                id="description"
                value={task.description}
                error={errors?.description}
                isEditMode={isEditMode}
                onChange={fieldChangeHandler}
                isRequired
                isMultiline
            />
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <FieldControl
                    label="Приоритет"
                    name="priority_id"
                    id="priority_id"
                    value={task.priority_id}
                    error={errors?.priority_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={taskPriority}
                    isRequired
                />
                <FieldControl
                    label="Тип работ"
                    name="type_id"
                    id="type_id"
                    value={task.type_id}
                    error={errors?.type_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={taskTypes}
                />
            </Stack>
            <Stack direction="row" spacing={2}>
                <FieldControl
                    label="Автор"
                    name="author_id"
                    id="author_id"
                    value={task.author_id}
                    error={errors?.author_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={usersList}
                />
                <FieldControl
                    label="Исполнитель"
                    name="assigned_to_id"
                    id="assigned_to_id"
                    value={task.assigned_to_id}
                    error={errors?.assigned_to_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={usersList}
                />
            </Stack>
            {task.problem_id && (
                <ProblemCard currentProblemId={task.problem_id}
                             isOpen={isOpenProblemCard}
                             onClose={toggleIsOpenProblemCard}/>
            )}
        </Stack>
    );
};

export default TaskIssueView;