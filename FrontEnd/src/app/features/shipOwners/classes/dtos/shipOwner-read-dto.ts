import { Metadata } from 'src/app/shared/classes/metadata'

export interface ShipOwnerReadDto extends Metadata {

    // PK
    id: number
    // Fields
    description: string
    profession: string
    address: string
    taxNo: string
    city: string
    phones: string
    email: string
    isActive: boolean

}
