import {INewTask} from "../../../models/ITasks";
import {basePath} from "../../../api";

const tasksPath = `${basePath}/tasks/`;

export const tasksAPI = {
    addNew: async (newTask: INewTask) => {
        const res = await fetch(tasksPath, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return  await res.json();
    },
};