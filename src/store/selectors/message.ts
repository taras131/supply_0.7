import {RootState} from "../store";
import {IMessage} from "../../models/IMessage";

export const getMessage = (state: RootState): IMessage => {
    return state.message.message
}

export const getIsShowMessage = (state: RootState): boolean => {
    return state.message.isShow
}