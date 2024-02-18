import { Metadata } from 'src/app/shared/classes/metadata'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface ShipOwnerReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    nationality: SimpleEntity
    taxOffice: SimpleEntity
    vatRegime: SimpleEntity
    // Fields
    description: string
    vatNumber: string
    branch: number
    profession: string
    address: string
    postalCode: string
    city: string
    phones: string
    personInCharge: string
    email: string
    isActive: boolean

}
