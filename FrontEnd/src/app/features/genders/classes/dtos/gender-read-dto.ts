import { Metadata } from 'src/app/shared/classes/metadata'

export interface GenderReadDto extends Metadata {

    id: number
    description: string
    isActive: boolean
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
