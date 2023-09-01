import { Metadata } from 'src/app/shared/classes/metadata'

export interface ShipRouteReadDto extends Metadata {

    id: number
    description: string
    fromPort: string
    fromTime: string
    viaPort: string
    viaTime: string
    toPort: string
    toTime: string
    isActive: boolean

}
