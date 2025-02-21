import {AppDispatch} from "./index";
import {MESSAGE_SEVERITY} from "../utils/const";
import {setMessage} from "./reducers/message";

export const handlerError = (e: unknown): string => {
    if (e instanceof Error) return e.message;
    if (typeof e === "string") return e;
    return "неизвестная ошибка";
};

export const thunkHandlers = {
    error: (e: unknown, defaultMessage: string, dispatch: AppDispatch) => {
        const errorMessage = e instanceof Error ? e.message : "Неизвестная ошибка";
        dispatch(
            setMessage({
                severity: MESSAGE_SEVERITY.error,
                text: errorMessage || defaultMessage,
            })
        );
        return handlerError(e);
    },
    success: (message: string, dispatch: AppDispatch) => {
        dispatch(
            setMessage({
                severity: MESSAGE_SEVERITY.success,
                text: message,
            })
        );
    },
};


