import { Guid } from 'guid-typescript'

export interface CustomerWriteDto {

    // PK
    id: number
    // FKs
    nationalityId: number
    taxOfficeId: Guid
    vatRegimeId: Guid
    // Fields
    abbreviation: string
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
    balanceLimit: number
    isActive: boolean
    // Metadata
    putAt: string

}
