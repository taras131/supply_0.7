import {RootState} from "../../../store";
import {createSelector} from "@reduxjs/toolkit";

export const getProblemsIsLoading = (state: RootState): boolean => {
    return state.problems.isLoading;
};

export const getProblems = createSelector(
    [(state: RootState) => state.problems.list],
    (problems) => {
        if (!problems.length) return [];
        return [...problems].sort((a, b) => b.created_date - a.created_date);
    }
);

export const getActiveProblems = createSelector(
    [
        (state: RootState) => state.problems.list, // список проблем
        (_: RootState, problemId: number) => problemId, // параметр problemId
        (_: RootState, problemId: number, machineryId: number) => machineryId, // параметр machineryId
    ],
    (problems, problemId, machineryId) => {
        if (!problems.length) return [];
        let filteredProblems = [...problems].filter(
            (problem) => problem.status_id !== 4 || problem.id === problemId
        );
        if (machineryId > 0) {
            filteredProblems = filteredProblems.filter(problem => problem.machinery_id === machineryId || problem.id === problemId
            );
        }
        return filteredProblems.sort((a, b) => b.created_date - a.created_date);
    }
);

export const getProblemTitleById = createSelector(
    [
        (state: RootState) => state.problems.list,
        (_: RootState, problemId: number) => problemId,
    ],
    (problems, problemId) => {
        return problems.find(problem => problem.id === problemId)?.title || "";
    }
);

export const getProblemById = createSelector(
    [
        (state: RootState) => state.problems.list,
        (_state: RootState, problemId: number) => problemId,
    ],
    (problems, problemId) => {
        return problems.find((problem) => problem.id === problemId) || null; // Находим проблему по ID
    }
);

