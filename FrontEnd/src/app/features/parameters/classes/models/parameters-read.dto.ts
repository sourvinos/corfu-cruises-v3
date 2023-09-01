import { Metadata } from 'src/app/shared/classes/metadata'

export interface ParametersReadDto extends Metadata {

    id: number
    closingTime: string
    phones: string
    email: string
    user: string
    lastUpdate: string

}
