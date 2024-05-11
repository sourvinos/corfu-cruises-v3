import { Guid } from 'guid-typescript'
import { Metadata } from 'src/app/shared/classes/metadata'

export interface PaymentMethodReadDto extends Metadata {

    // PK
    id: Guid
    // Fields
    description: string
    isCash: boolean
    isDefault: boolean
    isActive: boolean

}
