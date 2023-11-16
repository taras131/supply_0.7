import {TShipmentsType} from "../models/iShipments";
import {TOrdersType} from "../models/iOrders";

export enum MESSAGE_SEVERITY {
    error = "error",
    warning = "warning",
    info = "info",
    success = "success"
}

export const userRoles = {boss: "Директор", supplier: "Снабженец", accountant: "Бухгалтер"};

export const commentPanelId = "commentPanel";
export const shipmentPanelId = "shipment";
export const STRING_EMPTY = "";
export const STRING_WITH_SPACE = " ";
export const ADD_BUTTON_TEXT = "Добавить";

export const drawerWidth = 240;

interface IShipmentType {
    name: TShipmentsType
    value: string
}

interface IOrderType {
    name: TOrdersType,
    value: string
}

export const shipmentTypes: IShipmentType [] = [{name: "air", value: "Авиа"}, {name: "railway", value: "ЖД"}];
export const ordersTypes: IOrderType [] = [{name: "current", value: "Текущая"}, {name: "annual", value: "Годовая"}];

export const CANCEL_TEXT = "Отменён";
export const DOWNLOAD_TEXT = "Скачать";
export const UPLOAD_TEXT = "Загрузить";
export const NO_TEXT = "Нет";
export const YES_TEXT = "Да";
export const COPY_TEXT = "скопировать";
export const INN_COPY_TEXT = "ИНН скопирован";
export const AMOUNT_COPY_TEXT = "Сумма скопирована";
export const FILE_TYPE = "file";









