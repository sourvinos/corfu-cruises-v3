import { Metadata } from 'src/app/shared/classes/metadata'

export interface PortReadDto extends Metadata {

    // PK
    id: number
    // Fields
    abbreviation: string
    description: string
    stopOrder: number
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string
    // Rowversion
    rowVersion: string

}
