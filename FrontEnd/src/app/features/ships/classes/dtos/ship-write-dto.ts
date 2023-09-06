export interface ShipWriteDto {

    // PK
    id: number
    // FKs
    shipOwnerId: number
    // Fields
    description: string
    abbreviation: string
    imo: string
    flag: string
    registryNo: string
    manager: string
    managerInGreece: string
    agent: string
    isActive: boolean
    // Rowversion
    rowVersion: string

}
