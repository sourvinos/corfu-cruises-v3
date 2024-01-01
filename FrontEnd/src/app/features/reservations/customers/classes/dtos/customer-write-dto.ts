import { Guid } from 'guid-typescript'

export interface CustomerWriteDto {

    // PK
    id: number
    // FKs
    taxOfficeId: Guid
    // Fields
    description: string
    taxNo: string
    profession: string
    address: string
    phones: string
    personInCharge: string
    email: string
    isActive: boolean
    // Rowversion
    putAt: string

}
