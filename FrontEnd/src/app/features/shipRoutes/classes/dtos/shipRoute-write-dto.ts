export interface ShipRouteWriteDto {

    // PK
    id: number
    // Fields
    description: string
    fromPort: string
    fromTime: string
    viaPort: string
    viaTime: string
    toPort: string
    toTime: string
    isActive: boolean
    // Rowversion
    rowVersion: string

}
