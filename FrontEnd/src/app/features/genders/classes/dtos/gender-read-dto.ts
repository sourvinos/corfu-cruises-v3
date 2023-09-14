import { Metadata } from 'src/app/shared/classes/metadata'

export interface GenderReadDto extends Metadata {

    // PF
    id: number
    // Fields
    description: string
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
