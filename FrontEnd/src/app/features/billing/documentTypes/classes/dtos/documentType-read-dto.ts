import { Guid } from 'guid-typescript'
// Custom
import { Metadata } from 'src/app/shared/classes/metadata'

export interface DocumentTypeReadDto extends Metadata {

    // PK
    id: Guid
    // Fields
    abbreviation: string
    description: string
    batch: string
    lastDate: string
    lastNo: number
    isActive: boolean
    // Plus or Minus
    customers: string
    suppliers: string
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
