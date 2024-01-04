import { Guid } from 'guid-typescript'

export interface PaymentMethodWriteDto {

    // PK
    id: Guid
    // Fields
    description: string
    isCash: boolean
    isActive: boolean
    // Rowversion
    putAt: string

}
