import { Guid } from 'guid-typescript'

export interface CustomerWriteDto {

    // PK
    id: number
    // FKs
    nationalityId: number
    taxOfficeId: Guid
    vatRegimeId: Guid
    // Fields
    description: string
    taxNo: string
    profession: string
    address: string
    phones: string
    personInCharge: string
    email: string
    balanceLimit: number
    isActive: boolean
    // Metadata
    putAt: string

}
