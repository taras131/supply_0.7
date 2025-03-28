import React, {ChangeEvent, useState} from "react";
import {useAppSelector} from "../../../hooks/redux";
import {getProblems} from "../model/selectors";
import Problems from "./Problems";
import ProblemsPageHeader from "./ProblemsPageHeader";
import {SelectChangeEvent, Stack, Typography} from "@mui/material";

const ProblemsPage = () => {
    const [problemsFilter, setProblemsFilter] = useState({
        machinery_id: -1,
        category_id: -1,
        text: "",
        status_id: -1,
    });
    let filteredProblems = useAppSelector(getProblems);
    const filterChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => {
        if (e && e.target.name) {
            setProblemsFilter(prev => ({...prev, [e.target.name]: e.target.value}));
        }
    };
    if (problemsFilter.machinery_id > 0) {
        filteredProblems = filteredProblems.filter(problem => problem.machinery_id === problemsFilter.machinery_id);
    }
    if (problemsFilter.category_id > 0) {
        filteredProblems = filteredProblems.filter(problem => problem.category_id === problemsFilter.category_id);
    }
    if (problemsFilter.status_id > 0) {
        filteredProblems = filteredProblems.filter(problem => problem.status_id === problemsFilter.status_id);
    }
    if (problemsFilter.text.length > 0) {
        filteredProblems = filteredProblems.filter(problem => problem.title.toLowerCase().includes(problemsFilter.text.toLowerCase())
            || problem.description.toLowerCase().includes(problemsFilter.text.toLowerCase()));
    }
    return (
        <Stack spacing={2}>
            <ProblemsPageHeader problemsFilter={problemsFilter} filterChangeHandler={filterChangeHandler}/>
            {filteredProblems.length
                ? (<Problems problems={filteredProblems} isMachineryMode={false}/>)
                : (<Typography textAlign="center" mt={5}>
                    Нет проблем , отвечающей параметрам фильтрации
                </Typography>)}
        </Stack>
    );
};

export default ProblemsPage;