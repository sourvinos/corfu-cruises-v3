import { Metadata } from 'src/app/shared/classes/metadata'

export interface PortReadDto extends Metadata {
    id: number
    abbreviation: string
    description: string
    stopOrder: number
    isActive: boolean
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
