export interface ShipOwnerWriteDto {

    // PK
    id: number
    // FKs
    nationalityId: number
    // Fields
    description: string
    profession: string
    address: string
    taxNo: string
    branch: number
    city: string
    phones: string
    email: string
    isActive: boolean
    // Rowversion
    putAt: string

}
