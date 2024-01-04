import { Guid } from 'guid-typescript'

export interface CodeWriteDto {

    // PK
    id: Guid
    // Fields
    description: string
    batch: string
    lastDate: string
    lastNo: number
    isActive: boolean
    // Metadata
    putAt: string

}
