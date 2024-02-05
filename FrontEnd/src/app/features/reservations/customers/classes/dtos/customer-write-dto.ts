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
    taxNo: string
    branch: number
    profession: string
    address: string
    postalCode: string
    city: string
    phones: string
    personInCharge: string
    email: string
    balanceLimit: number
    isActive: boolean
    // Metadata
    putAt: string

}
