export interface INewMachinery {
    brand: string
    model: string
    yearOfManufacture: number
    categoryId: string
}

export interface IMachinery extends INewMachinery {
    id: string
}