import React, {FC} from "react";
import {IProblem} from "../../../../models/IProblems";
import Grid from "@mui/material/Unstable_Grid2";
import ProblemCard from "./ProblemCard";


interface IProps {
    problems: IProblem[];
}

const ProblemsList: FC<IProps> = ({problems}) => {
    const problemsList = problems.map(problem => (<Grid key={problem.id} lg={4} md={6} xs={12}>
        <ProblemCard problem={problem}/>
    </Grid>));
    return (
        <Grid container spacing={3}>
            {problemsList}
        </Grid>
    );
};

export default ProblemsList;