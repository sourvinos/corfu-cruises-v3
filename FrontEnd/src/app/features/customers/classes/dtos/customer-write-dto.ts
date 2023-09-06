export interface CustomerWriteDto {

    // PK
    id: number
    // Fields
    description: string
    profession: string
    address: string
    phones: string
    personInCharge: string
    email: string
    isActive: boolean
    // Rowversion
    rowVersion: string

}
