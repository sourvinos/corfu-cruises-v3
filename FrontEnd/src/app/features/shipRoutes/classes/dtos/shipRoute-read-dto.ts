import { Metadata } from 'src/app/shared/classes/metadata'

export interface ShipRouteReadDto extends Metadata {

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

}
