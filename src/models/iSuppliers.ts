export interface INewSupplier {
  name: string;
  INN: string;
}

export interface ISupplier extends INewSupplier {
  id: string;
}
