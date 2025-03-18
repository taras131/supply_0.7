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

export const getProblemById = createSelector(
    [
        (state: RootState) => state.problems.list,
        (_state: RootState, problemId: number) => problemId,
    ],
    (problems, problemId) => {
        return problems.find((problem) => problem.id === problemId) || null; // Находим проблему по ID
    }
);