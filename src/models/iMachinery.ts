export interface INotice {
    createdDate: number
    text: string
    isActive: boolean
    authorId? : string
}


export interface INewMachinery {
    brand: string
    model: string
    yearManufacture: string
    type: string
    vin: string
    stateNumber: string
}

export interface IMachinery extends INewMachinery {
    id: string
    notices?: INotice[]
}