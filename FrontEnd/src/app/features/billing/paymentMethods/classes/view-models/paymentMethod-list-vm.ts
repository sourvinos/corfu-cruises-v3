import { Guid } from 'guid-typescript'

export interface PaymentMethodListVM {

    id: Guid
    description: string
    isCash: boolean
    isActive: boolean

}
