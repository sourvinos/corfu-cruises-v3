export interface RegistrarWriteDto {

    // PK
    id: number
    // FKs
    shipId: number
    // Fields
    fullname: string
    phones: string
    email: string
    fax: string
    address: string
    isPrimary: boolean
    isActive: boolean
    // Rowversion
    putAt: string

}
