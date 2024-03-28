import { Metadata } from 'src/app/shared/classes/metadata'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface DocumentTypeReadDto extends Metadata {

    // PK
    id: number
    // FKs
    company: SimpleEntity
    // Fields
    abbreviation: string
    description: string
    batch: string
    lastDate: string
    lastNo: number
    customers: string
    suppliers: string
    discriminatorId: number
    isMyData: boolean
    table8_1: string
    table8_8: string
    table8_9: string
    isActive: boolean
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
