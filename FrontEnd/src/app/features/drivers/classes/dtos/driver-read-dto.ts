import { Metadata } from 'src/app/shared/classes/metadata'

export interface DriverReadDto extends Metadata {

    id: number
    description: string
    phones: string
    isActive: boolean
    user: string
    lastUpdate: string

}
