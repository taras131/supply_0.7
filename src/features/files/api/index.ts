import {basePath} from "../../../api";

export const filesPath = `${basePath}/files`;

export const filesAPI = {
    upload: async (formData: FormData) => {
        const response = await fetch(filesPath, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    },
    delete: async (filename: string) => {
        const response = await fetch(`${filesPath}/${filename}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    },
};