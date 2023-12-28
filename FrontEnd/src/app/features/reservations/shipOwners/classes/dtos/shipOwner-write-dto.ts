export interface ShipOwnerWriteDto {

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
    // Rowversion
    putAt: string

}
