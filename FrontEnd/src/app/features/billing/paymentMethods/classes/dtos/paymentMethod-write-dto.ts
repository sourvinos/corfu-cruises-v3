import { Guid } from 'guid-typescript'

export interface PaymentMethodWriteDto {

    // PK
    id: Guid
    // Fields
    description: string
    myDataId: string
    isCash: boolean
    isDefault: boolean
    isActive: boolean
    // Rowversion
    putAt: string

}
