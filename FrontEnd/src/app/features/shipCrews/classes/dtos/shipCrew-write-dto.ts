export interface ShipCrewWriteDto {

    // PK
    id: number
    // FKs
    genderId: number
    nationalityId: number
    shipId: number
    // Fields
    lastname: string
    firstname: string
    birthdate: string
    isActive: boolean
    // Rowversion
    rowVersion: string

}
