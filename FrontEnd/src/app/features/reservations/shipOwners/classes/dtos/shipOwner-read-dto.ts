import { Metadata } from 'src/app/shared/classes/metadata'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface ShipOwnerReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    nationality: SimpleEntity
    taxOffice: SimpleEntity
    // Fields
    vatPercent: number
    vatPercentId: number
    vatExemptionId: number
    description: string
    descriptionEn: string
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
    isGroupJP: boolean
    demoUrl: string
    demoUsername: string
    demoSubscriptionKey: string
    liveUrl: string
    liveUsername: string
    liveSubscriptionKey: string
    isDemoMyData: boolean
    isActive: boolean

}
