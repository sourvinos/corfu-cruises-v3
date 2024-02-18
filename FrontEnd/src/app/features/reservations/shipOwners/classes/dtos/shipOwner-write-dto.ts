export interface ShipOwnerWriteDto {

    // PK
    id: number
    // FKs
    nationalityId: number
    taxOfficeId: number
    vatRegimeId: number
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
    // Rowversion
    putAt: string

}
