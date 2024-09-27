import {MachineryStatus} from "utils/const";

export interface INotice {
  createdDate: number;
  text: string;
  isActive: boolean;
  authorId?: string;
}

export type MachineryStatusType = typeof MachineryStatus[keyof typeof MachineryStatus];

export interface INewMachinery {
  brand: string;
  model: string;
  yearManufacture: string;
  type: string;
  vin: string;
  stateNumber: string;
  status?: MachineryStatusType
}

export interface IMachinery extends INewMachinery {
  id: string;
  notices?: INotice[];
}
