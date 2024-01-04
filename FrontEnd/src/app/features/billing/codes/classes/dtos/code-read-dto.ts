import { Guid } from 'guid-typescript'
// Custom
import { Metadata } from 'src/app/shared/classes/metadata'

export interface CodeReadDto extends Metadata {

    // PK
    id: Guid
    // Fields
    description: string
    batch: string
    lastDate: string
    lastNo: number
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
