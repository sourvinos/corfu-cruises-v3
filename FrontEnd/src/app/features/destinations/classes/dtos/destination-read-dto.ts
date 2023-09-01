import { Metadata } from 'src/app/shared/classes/metadata'

export interface DestinationReadDto extends Metadata {

    id: number
    abbreviation: string
    description: string
    isActive: boolean
    user: string
    lastUpdate: string

}
