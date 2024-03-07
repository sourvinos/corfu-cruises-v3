import { Metadata } from 'src/app/shared/classes/metadata'

export interface DocumentTypeReadDto extends Metadata {

    // PK
    id: number
    // Fields
    abbreviation: string
    description: string
    batch: string
    lastDate: string
    lastNo: number
    customers: string
    suppliers: string
    discriminatorId: number
    isActive: boolean
    // myData
    isMyData: boolean
    table8_1: string
    table8_8: string
    table8_9: string
    // Metadata
    postAt: string
    postUser: string
    putAt: string
    putUser: string

}
