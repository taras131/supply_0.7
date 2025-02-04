import React, {ChangeEvent, FC} from "react";
import {SelectChangeEvent} from "@mui/material";
import {INewProblem, IProblem} from "../../../../models/IProblems";
import TextField from "@mui/material/TextField";
import PrioritiesSelect from "../common/PrioritiesSelect";
import CategorySelector from "../common/CategorySelector";
import {problemCategories} from "../../utils/const";

interface IProps {
    editedProblem: IProblem | INewProblem | null;
    problemFieldChangeHandler: (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement> | SelectChangeEvent) => void
}

const ProblemEdit: FC<IProps> = ({editedProblem, problemFieldChangeHandler}) => {
    if (!editedProblem) return null;
    return (
        <>
            <CategorySelector categories={problemCategories}
                              selectedCategoryId={editedProblem.category_id}
                              selectedSubCategoryId={editedProblem.subcategory_id}
                              handleChange={problemFieldChangeHandler}
            />
            <PrioritiesSelect currentPriorityId={editedProblem.priority_id}
                              changeHandler={problemFieldChangeHandler}/>
            <TextField id="outlined-basic"
                       label="Заголовок"
                       variant="outlined"
                       name="title"
                       onChange={problemFieldChangeHandler}
                       value={editedProblem.title}/>
            <TextField
                id="outlined-basic"
                label="Описание"
                variant="outlined"
                name="description"
                onChange={problemFieldChangeHandler}
                value={editedProblem.description}
                multiline
                rows={5}
            />
        </>
    );
};

export default ProblemEdit;