import {IAuthData, IRegisterData} from "../../../models/iAuth";
import {appAPI, basePath} from "../../../api";

const registerPath = `${basePath}/auth/register`;
const loginPath = `${basePath}/auth/login`;
const checkPath = `${basePath}/auth/check`;

const parseJwt = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
    );

    return JSON.parse(jsonPayload);
};

export const authAPI = {
    login: async (authData: IAuthData) => {
        const res = await fetch(loginPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(authData),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        const { access_token } = await res.json();
        localStorage.setItem("token", access_token);
        // Расшифровка токена
        return parseJwt(access_token);

    },
    register: async (registerData: IRegisterData) => {
        const res = await fetch(registerPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });
        if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(errorDetails.message || `Ошибка сервера: ${res.status} ${res.statusText}`);
        }
        return  await res.json();
    },
    out: async () => {
      /*  const res = await signOut(this.auth);
        return res;*/
    },
    check: async () => {
        try {
            const res = await appAPI.get(checkPath);
            const { access_token } = res.data;
            return parseJwt(access_token);
        } catch (e: any) {
            if (e.response?.status === 401) {
                localStorage.removeItem("token");
            }
            throw e;
        }
    },
};