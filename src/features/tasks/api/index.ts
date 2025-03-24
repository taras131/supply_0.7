import {INewTask, ITask} from "../../../models/ITasks";
import {basePath} from "../../../api";

export const tasksPath = `${basePath}/tasks/`;

export const tasksAPI = {
    getTasks: async () => {
        const res = await fetch(tasksPath, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    getTaskById: async (taskId: number) => {
        const res = await fetch(`${tasksPath}${taskId}/`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    addNewTask: async (newTask: INewTask) => {
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
        return await res.json();
    },
    updateTask: async (task: ITask) => {
        const res = await fetch(`${tasksPath}${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.detail || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
}