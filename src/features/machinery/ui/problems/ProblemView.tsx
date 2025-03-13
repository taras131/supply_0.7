import React, {ChangeEvent, FC} from "react";
import {INewProblem, IProblem} from "../../../../models/IProblems";
import {convertMillisecondsToDate} from "../../../../utils/services";
import {ValidationErrors} from "../../../../utils/validators";
import {Button, Chip, List, SelectChangeEvent, Stack, Typography} from "@mui/material";
import FieldControl from "../../../../components/common/FieldControl";
import {problemCategories, problemPriority, problemStatus} from "../../utils/const";
import {getPriorityChipColor, getPriorityTitleById} from "../../utils/services";
import AddIcon from "@mui/icons-material/Add";
import {useAppSelector} from "../../../../hooks/redux";
import {getUserFullNameById} from "../../../users/model/selectors";
import {useNavigate} from "react-router-dom";
import TaskReportItem from "../tasks/TaskReportItem";

interface IProps {
    problem: INewProblem | IProblem | null;
    errors?: ValidationErrors;
    isEditMode?: boolean;
    fieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent<string | unknown>) => void
}

const ProblemView: FC<IProps> = ({problem, fieldChangeHandler, isEditMode = false, errors}) => {
    const navigate = useNavigate();
    const priorityColor = getPriorityChipColor(problem?.priority_id || 0);
    const authorFullName = useAppSelector(state => getUserFullNameById(state, problem?.author_id || null));
    let problemId = 0;
    if (!problem) {
        return null;
    }
    if ("id" in problem) {
        problemId = problem.id;
    }
    const createTaskClickHandler = () => {
        navigate(`/machinery/add_problem/${problem.machinery_id}`, {
            state: {problemId: problemId},
        });
    };
    const tasksList = problem.tasks_id.map(taskId => (<TaskReportItem key={taskId} taskId={taskId}/>));
    return (
        <Stack spacing={isEditMode ? 2 : 4} sx={{flexGrow: 1}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                {isEditMode
                    ? (<>
                        <FieldControl
                            label="Статус"
                            name="status_id"
                            id="status_id"
                            value={problem.status_id}
                            isEditMode={isEditMode}
                            onChange={fieldChangeHandler}
                            options={problemStatus}
                        />
                        <FieldControl
                            label="Приоритет"
                            name="priority_id"
                            id="priority_id"
                            value={problem.priority_id}
                            isEditMode={isEditMode}
                            onChange={fieldChangeHandler}
                            options={problemPriority}
                        />
                    </>)
                    : (<>
                        <Button variant="outlined"
                                size="small"
                                onClick={createTaskClickHandler}
                                startIcon={<AddIcon />}>
                            Создать задачу
                        </Button>
                        <Chip
                            label={getPriorityTitleById(problem.priority_id)}
                            color={priorityColor}
                            sx={{width: "100px"}}
                        />
                    </>)}
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <FieldControl
                    label="Категория"
                    name="category_id"
                    id="category_id"
                    value={problem.category_id}
                    error={errors?.category_id}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                    options={problemCategories}
                    isRequired
                />
                {!isEditMode && (
                    <FieldControl
                        label="Автор"
                        name="author"
                        id="author"
                        value={authorFullName ? authorFullName : "неизвестен"}
                        isEditMode={isEditMode}
                        onChange={fieldChangeHandler}
                    />
                )}
            </Stack>
            <FieldControl
                label="Заголовок"
                name="title"
                id="title"
                value={problem.title}
                error={errors?.title}
                isEditMode={isEditMode}
                onChange={fieldChangeHandler}
                isRequired
            />
            <FieldControl
                label="Описание"
                name="description"
                id="description"
                value={problem.description}
                error={errors?.description}
                isEditMode={isEditMode}
                onChange={fieldChangeHandler}
                isMultiline
                isRequired
                sx={{
                    flexGrow: 1,
                    height: "100%",
                }}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <FieldControl
                    label="Наработка (часы)"
                    name="operating"
                    id="operating"
                    value={problem.operating}
                    error={errors?.operating}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                />
                <FieldControl
                    label="Пробег (километры)"
                    name="odometer"
                    id="odometer"
                    value={problem.odometer}
                    error={errors?.odometer}
                    isEditMode={isEditMode}
                    onChange={fieldChangeHandler}
                />
            </Stack>
            {"created_date" in problem && "updated_date" in problem && !isEditMode && (
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                    <FieldControl
                        label="Добавлена"
                        name="created_date"
                        id="created_date"
                        value={convertMillisecondsToDate(problem.created_date)}
                        isEditMode={false}
                        onChange={fieldChangeHandler}
                    />
                    <FieldControl
                        label="Обновлена"
                        name="updated_date"
                        id="updated_date"
                        value={convertMillisecondsToDate(problem.updated_date)}
                        isEditMode={false}
                        onChange={fieldChangeHandler}
                    />
                </Stack>
            )}
            {!isEditMode && problem.tasks_id && (
                <Stack>
                    <Typography variant="subtitle2">Связанные задачи</Typography>
                    <List sx={{width: "100%", backgroundColor: "background.paper"}}>
                        {tasksList}
                    </List>
                </Stack>
            )}
        </Stack>
    );
};

export default ProblemView;