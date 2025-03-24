import {IMachinery, INewMachinery, INewMachineryDoc} from "../../../models/iMachinery";
import axios from "axios";
import {IComment, INewComment} from "../../../models/iComents";
import {basePath} from "../../../api";

const machineryPath = `${basePath}/machinery`;
const noticePath = "comment";
const docPath = "docs";


interface IAddDocParams {
    doc: INewMachineryDoc;
    fileName: string;
}

export const machineryAPI = {
    addMachinery: async (machinery: INewMachinery) => {
        const res = await fetch(machineryPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(machinery),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    updateMachinery: async (machinery: IMachinery) => {
        const res = await fetch(`${machineryPath}/${machinery.id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(machinery),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.detail || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    getAll: async () => {
        return await axios.get(machineryPath);
    },
    getOne: async (machinery_id: number) => {
        const res = await axios.get(`${machineryPath}/${machinery_id}/`, {});
        return res.data;
    },
    addComment: async (comment: INewComment) => {
        const res = await fetch(`${machineryPath}/${noticePath}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    deleteComment: async (comment_id: number) => {
        const res = await fetch(`${machineryPath}/${noticePath}/${comment_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return true;
    },
    updateComment: async (comment: IComment) => {
        const res = await fetch(`${machineryPath}/${noticePath}/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.detail || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    },
    addDoc: async ({doc, fileName}: IAddDocParams) => {
        const res = await fetch(`${machineryPath}/${docPath}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...doc, file_name: fileName}),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        const {machinery, ...filteredResult} = await res.json();
        void machinery;
        return filteredResult;
    },

};

