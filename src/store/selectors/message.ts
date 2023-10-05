import {IMessage} from "../../models/IMessage";
import {RootState} from "../index";

export const getMessage = (state: RootState): IMessage => {
    return state.message.message
}

export const getIsShowMessage = (state: RootState): boolean => {
    return state.message.isShow
}