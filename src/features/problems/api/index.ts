import {INewProblem, IProblem} from "../../../models/IProblems";
import {basePath} from "../../../api";

const problemsPath = `${basePath}/problems/`;

export const problemsAPI = {
    addNewProblem: async (newProblem: INewProblem) => {
        const res = await fetch(problemsPath, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProblem),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    updateProblem: async (problem: IProblem) => {
        const res = await fetch(`${problemsPath}${problem.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(problem),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.detail || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    },

};