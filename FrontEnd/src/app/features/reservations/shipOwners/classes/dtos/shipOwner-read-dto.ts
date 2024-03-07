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
    street: string
    number: string
    postalCode: string
    city: string
    personInCharge: string
    phones: string
    email: string
    demoUrl: string
    demoUsername: string
    demoPassword: string
    liveUrl: string
    liveUsername: string
    livePassword: string
    isDemoMyData: boolean
    isActive: boolean

}
